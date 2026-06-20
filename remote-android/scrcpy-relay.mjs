import fs from "node:fs/promises";
import { generateKeyPairSync } from "node:crypto";
import { Socket } from "node:net";

import {
  Adb,
  AdbDaemonTransport,
  AdbPacket,
  AdbPacketSerializeStream,
} from "@yume-chan/adb";
import {
  AdbScrcpyClient,
  AdbScrcpyOptions3_3_3,
} from "@yume-chan/adb-scrcpy";
import {
  AndroidKeyCode,
  AndroidKeyEventAction,
  AndroidMotionEventAction,
  AndroidMotionEventButton,
  ScrcpyPointerId,
} from "@yume-chan/scrcpy";
import {
  BufferedReadableStream,
  MaybeConsumable,
  PushReadableStream,
  ReadableStream,
  WritableStream,
} from "@yume-chan/stream-extra";
import { WebSocket, WebSocketServer } from "ws";

const SCRCPY_DEVICE_PATH = "/data/local/tmp/dqueq-scrcpy-server.jar";
const MAX_BUFFERED_BYTES = 16 * 1024 * 1024;

function fileStream(data) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });
}

function createCredentialStore() {
  const keys = [];
  return {
    generateKey() {
      const { privateKey } = generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicExponent: 65537,
      });
      const key = {
        buffer: new Uint8Array(
          privateKey.export({ type: "pkcs8", format: "der" })
        ),
        name: "dqueq-remote",
      };
      keys.push(key);
      return key;
    },
    iterateKeys() {
      return keys.values();
    },
  };
}

async function createDirectAdb(host, port, serial) {
  const socket = new Socket();
  socket.setNoDelay(true);
  socket.connect({ host, port });
  await new Promise((resolve, reject) => {
    socket.once("connect", resolve);
    socket.once("error", reject);
  });

  const rawReadable = new PushReadableStream((controller) => {
    socket.on("data", async (data) => {
      if (controller.abortSignal.aborted) return;
      socket.pause();
      await controller.enqueue(data);
      socket.resume();
    });
    socket.on("end", () => controller.close());
    socket.on("error", (error) => controller.error(error));
  });

  const rawWritable = new MaybeConsumable.WritableStream({
    write(chunk) {
      return new Promise((resolve, reject) => {
        socket.write(chunk, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    },
    close() {
      socket.end();
    },
    abort() {
      socket.destroy();
    },
  });

  const buffered = new BufferedReadableStream(rawReadable);
  const packetReadable = new PushReadableStream(async (controller) => {
    while (!controller.abortSignal.aborted) {
      const packet = await AdbPacket.deserialize(buffered);
      await controller.enqueue(packet);
    }
  });
  const serializer = new AdbPacketSerializeStream();
  serializer.readable.pipeTo(rawWritable).catch((error) => {
    if (!socket.destroyed) socket.destroy(error);
  });

  const transport = await AdbDaemonTransport.authenticate({
    serial,
    connection: {
      readable: packetReadable,
      writable: serializer.writable,
    },
    credentialStore: createCredentialStore(),
  });
  return new Adb(transport);
}

export function attachScrcpyRelay({
  server,
  device,
  serverPath,
  appComponent = "me.deltaqueue.dqueue/me.deltaqueue.dqueue.MainActivity",
  adbHost = "127.0.0.1",
  adbPort = 5555,
}) {
  const sockets = new Set();
  const wss = new WebSocketServer({ noServer: true });
  let state = "idle";
  let detail = "Waiting for browser";
  let startPromise;
  let client;
  let directAdb;
  let latestMetadata;
  let latestConfiguration;
  let videoWidth = 900;
  let videoHeight = 1600;

  function sendJson(socket, payload) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }

  function broadcastJson(payload) {
    for (const socket of sockets) sendJson(socket, payload);
  }

  function sendPacket(socket, packet) {
    if (socket.readyState !== WebSocket.OPEN) return;
    if (socket.bufferedAmount > MAX_BUFFERED_BYTES) {
      socket.close(1013, "Video client is too slow");
      return;
    }

    const data = Buffer.from(
      packet.data.buffer,
      packet.data.byteOffset,
      packet.data.byteLength
    );
    const message = Buffer.allocUnsafe(data.length + 1);
    message[0] =
      packet.type === "configuration" ? 0 : packet.keyframe ? 2 : 1;
    data.copy(message, 1);
    socket.send(message, { binary: true });
  }

  function broadcastPacket(packet) {
    for (const socket of sockets) sendPacket(socket, packet);
  }

  async function start() {
    if (startPromise) return startPromise;

    startPromise = (async () => {
      state = "starting";
      detail = "Starting scrcpy";
      broadcastJson({ type: "state", state, detail });

      const adb = await createDirectAdb(adbHost, adbPort, device);
      directAdb = adb;
      const serverData = new Uint8Array(await fs.readFile(serverPath));
      await AdbScrcpyClient.pushServer(
        adb,
        fileStream(serverData),
        SCRCPY_DEVICE_PATH
      );

      const options = new AdbScrcpyOptions3_3_3({
        video: true,
        audio: false,
        control: true,
        videoCodec: "h264",
        videoBitRate: 16_000_000,
        maxFps: 60,
        maxSize: 1920,
        sendFrameMeta: true,
        logLevel: "warn",
        tunnelForward: true,
      });

      client = await AdbScrcpyClient.start(
        adb,
        SCRCPY_DEVICE_PATH,
        options
      );

      client.output
        .pipeTo(
          new WritableStream({
            write(line) {
              if (line) console.log(`[scrcpy] ${line}`);
            },
          })
        )
        .catch((error) => {
          console.error("[scrcpy output]", error);
        });

      const video = await client.videoStream;
      if (!video) throw new Error("scrcpy video stream is unavailable");

      latestMetadata = {
        type: "metadata",
        codec: video.metadata.codec,
        width: video.metadata.width || 900,
        height: video.metadata.height || 1600,
      };
      videoWidth = latestMetadata.width;
      videoHeight = latestMetadata.height;
      state = "streaming";
      detail = "H.264 live";
      broadcastJson({ type: "state", state, detail });
      broadcastJson(latestMetadata);

      const reader = video.stream.getReader();
      while (true) {
        const { done, value: packet } = await reader.read();
        if (done) break;
        if (packet.type === "configuration") latestConfiguration = packet;
        broadcastPacket(packet);
      }

      throw new Error("scrcpy video stream ended");
    })()
      .catch(async (error) => {
        state = "error";
        detail = String(error?.message || error);
        broadcastJson({ type: "state", state, detail });
        console.error("[scrcpy]", error);
        try {
          await client?.close();
        } catch {
          // The fallback PNG stream remains available.
        }
        try {
          await directAdb?.close();
        } catch {
          // The connection may already be closed.
        }
        client = undefined;
        directAdb = undefined;
        throw error;
      })
      .finally(() => {
        if (state !== "streaming") startPromise = undefined;
      });

    return startPromise;
  }

  wss.on("connection", (socket) => {
    sockets.add(socket);
    sendJson(socket, { type: "state", state, detail });
    if (latestMetadata) sendJson(socket, latestMetadata);
    if (latestConfiguration) sendPacket(socket, latestConfiguration);

    start().catch(() => {
      // The browser handles this by continuing with PNG fallback.
    });

    if (client?.controller) {
      client.controller.resetVideo().catch(() => {});
    } else {
      const resetTimer = setInterval(() => {
        if (!client?.controller) return;
        clearInterval(resetTimer);
        client.controller.resetVideo().catch(() => {});
      }, 100);
      setTimeout(() => clearInterval(resetTimer), 10_000);
    }

    socket.on("close", () => sockets.delete(socket));
    socket.on("error", () => sockets.delete(socket));
  });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "/", "http://localhost");
    if (url.pathname !== "/scrcpy") {
      socket.destroy();
      return;
    }
    wss.handleUpgrade(request, socket, head, (webSocket) => {
      wss.emit("connection", webSocket, request);
    });
  });

  return {
    getState() {
      return { state, detail, clients: sockets.size };
    },
    async handleInput(payload) {
      const controller = client?.controller;
      if (!controller || !directAdb || state !== "streaming") return false;

      if (payload.type === "text") {
        const text = String(payload.text || "").slice(0, 500);
        if (!text) throw new Error("text is required");
        const encoded = Buffer.from(text, "utf8").toString("base64");
        await directAdb.subprocess.noneProtocol.spawnWaitText([
          "am",
          "broadcast",
          "-a",
          "ADB_INPUT_B64",
          "--es",
          "msg",
          encoded,
        ]);
        return true;
      }

      if (payload.type === "launch") {
        await directAdb.subprocess.noneProtocol.spawnWaitText([
          "am",
          "start",
          "-n",
          appComponent,
        ]);
        return true;
      }

      const toVideoX = (value) =>
        Math.round((Number(value) / 900) * videoWidth);
      const toVideoY = (value) =>
        Math.round((Number(value) / 1600) * videoHeight);
      const touch = (action, x, y, pressure) =>
        controller.injectTouch({
          action,
          pointerId: ScrcpyPointerId.Finger,
          pointerX: toVideoX(x),
          pointerY: toVideoY(y),
          videoWidth,
          videoHeight,
          pressure,
          actionButton: AndroidMotionEventButton.Primary,
          buttons:
            action === AndroidMotionEventAction.Up
              ? AndroidMotionEventButton.None
              : AndroidMotionEventButton.Primary,
        });

      if (payload.type === "tap") {
        await touch(AndroidMotionEventAction.Down, payload.x, payload.y, 1);
        await touch(AndroidMotionEventAction.Up, payload.x, payload.y, 0);
        return true;
      }

      if (payload.type === "swipe") {
        const duration = Math.max(
          50,
          Math.min(3000, Number(payload.duration) || 300)
        );
        const steps = Math.max(2, Math.min(30, Math.ceil(duration / 16)));
        await touch(
          AndroidMotionEventAction.Down,
          payload.x1,
          payload.y1,
          1
        );
        for (let index = 1; index < steps; index += 1) {
          const progress = index / steps;
          const x = Number(payload.x1) +
            (Number(payload.x2) - Number(payload.x1)) * progress;
          const y = Number(payload.y1) +
            (Number(payload.y2) - Number(payload.y1)) * progress;
          await new Promise((resolve) =>
            setTimeout(resolve, duration / steps)
          );
          await touch(AndroidMotionEventAction.Move, x, y, 1);
        }
        await touch(
          AndroidMotionEventAction.Up,
          payload.x2,
          payload.y2,
          0
        );
        return true;
      }

      if (payload.type === "key") {
        const keyCodes = {
          KEYCODE_BACK: AndroidKeyCode.AndroidBack,
          KEYCODE_HOME: AndroidKeyCode.AndroidHome,
          KEYCODE_APP_SWITCH: AndroidKeyCode.AndroidAppSwitch,
          KEYCODE_ENTER: AndroidKeyCode.Enter,
          KEYCODE_DEL: AndroidKeyCode.Backspace,
        };
        const keyCode = keyCodes[String(payload.key || "")];
        if (keyCode === undefined) {
          if (payload.key !== "KEYCODE_WAKEUP") return false;
          await directAdb.subprocess.noneProtocol.spawnWaitText([
            "input",
            "keyevent",
            "KEYCODE_WAKEUP",
          ]);
          return true;
        }
        const message = { keyCode, repeat: 0, metaState: 0 };
        await controller.injectKeyCode({
          ...message,
          action: AndroidKeyEventAction.Down,
        });
        await controller.injectKeyCode({
          ...message,
          action: AndroidKeyEventAction.Up,
        });
        return true;
      }

      return false;
    },
  };
}
