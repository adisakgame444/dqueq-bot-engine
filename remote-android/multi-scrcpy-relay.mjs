import { execFile, spawn } from "node:child_process";
import { Socket } from "node:net";

import { AdbScrcpyOptions3_3_3 } from "@yume-chan/adb-scrcpy";
import {
  AndroidKeyCode,
  AndroidKeyEventAction,
  AndroidMotionEventAction,
  AndroidMotionEventButton,
  ScrcpyControlMessageWriter,
  ScrcpyNewDisplay,
  ScrcpyPointerId,
} from "@yume-chan/scrcpy";
import {
  BufferedReadableStream,
  MaybeConsumable,
  PushReadableStream,
  WritableStream,
} from "@yume-chan/stream-extra";
import { WebSocket, WebSocketServer } from "ws";

const MAX_BUFFERED_BYTES = 16 * 1024 * 1024;
const DISPLAY_WIDTH = 900;
const DISPLAY_HEIGHT = 1920;
const DISPLAY_DENSITY = 320;
let adbConnectPromise = null;

function runAdbOnce(adbPath, device, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      adbPath,
      ["-s", device, ...args],
      {
        encoding: options.encoding === "buffer" ? null : "utf8",
        maxBuffer: options.maxBuffer || 12 * 1024 * 1024,
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        if (error) {
          const detail = String(stderr || stdout || error.message).trim();
          reject(new Error(detail || error.message));
          return;
        }
        resolve(stdout);
      }
    );
  });
}

function connectAdb(adbPath, device) {
  if (adbConnectPromise) return adbConnectPromise;
  adbConnectPromise = new Promise((resolve, reject) => {
    execFile(
      adbPath,
      ["connect", device],
      {
        encoding: "utf8",
        maxBuffer: 1024 * 1024,
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(String(stderr || stdout || error.message).trim()));
          return;
        }
        resolve(stdout);
      }
    );
  }).finally(() => {
    adbConnectPromise = null;
  });
  return adbConnectPromise;
}

async function runAdb(adbPath, device, args, options = {}) {
  if (device.includes(":")) {
    await connectAdb(adbPath, device);
  }
  try {
    return await runAdbOnce(adbPath, device, args, options);
  } catch (error) {
    const message = String(error?.message || error);
    const reconnectable =
      device.includes(":") &&
      /device .* not found|device offline|no devices\/emulators found/i.test(
        message
      );
    if (!reconnectable) throw error;
    await connectAdb(adbPath, device);
    return runAdbOnce(adbPath, device, args, options);
  }
}

function socketToStreams(socket) {
  socket.setNoDelay(true);
  const readable = new PushReadableStream((controller) => {
    socket.on("data", async (data) => {
      if (controller.abortSignal.aborted) return;
      socket.pause();
      await controller.enqueue(data);
      socket.resume();
    });
    socket.on("end", () => controller.close());
    socket.on("error", (error) => controller.error(error));
  });
  const writable = new MaybeConsumable.WritableStream({
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
  return { socket, readable, writable };
}

async function connectSocket(port) {
  const socket = new Socket();
  socket.connect({ host: "127.0.0.1", port });
  await new Promise((resolve, reject) => {
    socket.once("connect", resolve);
    socket.once("error", reject);
  });
  return socketToStreams(socket);
}

async function connectVideoSocket(port) {
  let lastError;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    let connection;
    try {
      connection = await connectSocket(port);
      const buffered = new BufferedReadableStream(connection.readable);
      await buffered.readExactly(1);
      return { ...connection, readable: buffered.release() };
    } catch (error) {
      lastError = error;
      connection?.socket.destroy();
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw lastError || new Error("Unable to connect to scrcpy video socket");
}

async function connectControlSocket(port) {
  let lastError;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      return await connectSocket(port);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw lastError || new Error("Unable to connect to scrcpy control socket");
}

async function killScrcpyProcesses(adbPath, device) {
  try {
    const output = await runAdbOnce(adbPath, device, ["shell", "ps -A"]).catch(() => "");
    if (!output) return;
    const lines = output.split(/\r?\n/);
    for (const line of lines) {
      if (line.includes("app_process") || line.toLowerCase().includes("scrcpy")) {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 1) {
          const pid = parts[1];
          if (/^\d+$/.test(pid)) {
            const cmdline = await runAdbOnce(adbPath, device, ["shell", `cat /proc/${pid}/cmdline`]).catch(() => "");
            if (cmdline.includes("com.genymobile.scrcpy.Server")) {
              await runAdbOnce(adbPath, device, ["shell", "kill", "-9", pid]).catch(() => {});
            }
          }
        }
      }
    }
  } catch (error) {
    // Ignore error
  }
}

function createSession({
  id,
  adbPath,
  device,
  serverPath,
  appPackage,
}) {
  const sockets = new Set();
  const scid = id.toString(16);
  const localPort = 27200 + id;
  const deviceServerPath = `/data/local/tmp/dqueq-scrcpy-${id}.jar`;
  const socketName = `localabstract:scrcpy_${scid.padStart(8, "0")}`;
  let state = "idle";
  let detail = "Waiting for browser";
  let startPromise;
  let process;
  let videoConnection;
  let controlConnection;
  let controller;
  let latestMetadata;
  let latestConfiguration;
  let videoWidth = DISPLAY_WIDTH;
  let videoHeight = DISPLAY_HEIGHT;

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
    scid,
    newDisplay: new ScrcpyNewDisplay(DISPLAY_WIDTH, DISPLAY_HEIGHT, DISPLAY_DENSITY),
    vdSystemDecorations: false,
    vdDestroyContent: true,
  });

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

  async function cleanup() {
    try {
      controller?.releaseLock();
    } catch {
      // The writer may already be closed.
    }
    controller = undefined;
    videoConnection?.socket.destroy();
    controlConnection?.socket.destroy();
    videoConnection = undefined;
    controlConnection = undefined;
    if (process && !process.killed) process.kill();
    process = undefined;
    await runAdb(adbPath, device, [
      "forward",
      "--remove",
      `tcp:${localPort}`,
    ]).catch(() => { });
    if (state !== "disabled") {
      state = "idle";
      detail = "Waiting for browser";
    }
  }

  async function start() {
    if (state === "streaming") return;
    if (startPromise) return startPromise;

    startPromise = (async () => {
      state = "starting";
      detail = `Starting virtual display ${id}`;
      broadcastJson({ type: "state", state, detail });

      // Kill any running scrcpy server instances on the Android device to ensure a clean restart
      await killScrcpyProcesses(adbPath, device);

      // Force Android to hide navigation and status bars globally for all apps
      await runAdb(adbPath, device, ["shell", "settings", "put", "global", "policy_control", "immersive.full=*"]).catch(() => {});

      await runAdb(adbPath, device, ["push", serverPath, deviceServerPath]);
      await runAdb(adbPath, device, [
        "forward",
        "--remove",
        `tcp:${localPort}`,
      ]).catch(() => { });
      await runAdb(adbPath, device, [
        "forward",
        `tcp:${localPort}`,
        socketName,
      ]);

      const args = [
        "-s",
        device,
        "shell",
        `CLASSPATH=${deviceServerPath}`,
        "app_process",
        "/",
        "com.genymobile.scrcpy.Server",
        options.version,
        ...options.serialize(),
      ];
      process = spawn(adbPath, args, {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
      });
      process.stdout.setEncoding("utf8");
      process.stderr.setEncoding("utf8");
      process.stdout.on("data", (text) => {
        const line = String(text).trim();
        if (line) console.log(`[scrcpy:${id}] ${line}`);
      });
      process.stderr.on("data", (text) => {
        const line = String(text).trim();
        if (line) console.error(`[scrcpy:${id}] ${line}`);
      });
      process.once("exit", (code) => {
        if (state === "streaming" || state === "starting") {
          state = "error";
          detail = `scrcpy session ${id} exited (${code})`;
          broadcastJson({ type: "state", state, detail });
        }
      });

      videoConnection = await connectVideoSocket(localPort);
      controlConnection = await connectControlSocket(localPort);
      controlConnection.readable
        .pipeTo(new WritableStream({ write() { } }))
        .catch(() => { });
      controller = new ScrcpyControlMessageWriter(
        controlConnection.writable.getWriter(),
        options
      );

      const parsedVideo = await options.parseVideoStreamMetadata(
        videoConnection.readable
      );
      latestMetadata = {
        type: "metadata",
        codec: parsedVideo.metadata.codec,
        width: parsedVideo.metadata.width || DISPLAY_WIDTH,
        height: parsedVideo.metadata.height || DISPLAY_HEIGHT,
        session: id,
      };
      videoWidth = latestMetadata.width;
      videoHeight = latestMetadata.height;

      const mediaStream = parsedVideo.stream.pipeThrough(
        options.createMediaStreamTransformer()
      );
      const reader = mediaStream.getReader();
      let appReady = false;
      let appOpenError;
      let waitingForAppKeyframe = true;
      const openApp = (async () => {
        await controller.startApp(appPackage);
        await new Promise((resolve) => setTimeout(resolve, 500));
        await controller.resetVideo();
        appReady = true;
      })().catch((error) => {
        appOpenError = error;
      });

      while (true) {
        const { done, value: packet } = await reader.read();
        if (done) break;
        if (appOpenError) throw appOpenError;
        if (packet.type === "configuration") latestConfiguration = packet;

        if (!appReady) continue;
        if (waitingForAppKeyframe) {
          if (packet.type === "configuration" || !packet.keyframe) continue;
          waitingForAppKeyframe = false;
          state = "streaming";
          detail = `Virtual display ${id} live`;
          broadcastJson({ type: "state", state, detail });
          broadcastJson(latestMetadata);
          if (latestConfiguration) broadcastPacket(latestConfiguration);
        }

        broadcastPacket(packet);
      }
      await openApp;
      throw new Error(`scrcpy session ${id} video stream ended`);
    })()
      .catch(async (error) => {
        state = "error";
        detail = String(error?.message || error);
        broadcastJson({ type: "state", state, detail });
        console.error(`[scrcpy:${id}]`, error);
        await cleanup();
        throw error;
      })
      .finally(() => {
        startPromise = undefined;
      });

    return startPromise;
  }

  function addSocket(socket) {
    sockets.add(socket);
    sendJson(socket, { type: "state", state, detail });
    if (latestMetadata) sendJson(socket, latestMetadata);
    if (latestConfiguration) sendPacket(socket, latestConfiguration);
    start().catch(() => { });

    if (state === "streaming" && controller) {
      setTimeout(() => controller?.resetVideo().catch(() => { }), 100);
    }

    socket.on("close", () => sockets.delete(socket));
    socket.on("error", () => sockets.delete(socket));
  }

  async function handleInput(payload) {
    if (!controller || state !== "streaming") return false;

    if (payload.type === "text") {
      const text = String(payload.text || "").slice(0, 500);
      if (!text) throw new Error("text is required");
      await controller.injectText(text);
      return true;
    }
    if (payload.type === "launch") {
      await controller.startApp(appPackage);
      return true;
    }

    const toVideoX = (value) =>
      Math.round((Number(value) / DISPLAY_WIDTH) * videoWidth);
    const toVideoY = (value) =>
      Math.round((Number(value) / DISPLAY_HEIGHT) * videoHeight);
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
      await touch(AndroidMotionEventAction.Down, payload.x1, payload.y1, 1);
      for (let index = 1; index < steps; index += 1) {
        const progress = index / steps;
        const x =
          Number(payload.x1) +
          (Number(payload.x2) - Number(payload.x1)) * progress;
        const y =
          Number(payload.y1) +
          (Number(payload.y2) - Number(payload.y1)) * progress;
        await new Promise((resolve) => setTimeout(resolve, duration / steps));
        await touch(AndroidMotionEventAction.Move, x, y, 1);
      }
      await touch(AndroidMotionEventAction.Up, payload.x2, payload.y2, 0);
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
      if (keyCode === undefined) return false;
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
  }

  return {
    id,
    appPackage,
    addSocket,
    start,
    getState() {
      return {
        state,
        detail,
        clients: sockets.size,
        session: id,
        appPackage,
      };
    },
    handleInput,
    cleanup,
    async disable() {
      state = "disabled";
      detail = "Account is disabled";
      broadcastJson({ type: "state", state, detail });
      for (const socket of sockets) {
        socket.close(1000, "Account disabled");
      }
      sockets.clear();
      await cleanup();
      state = "disabled";
      detail = "Account is disabled";
    },
  };
}

export function attachMultiScrcpyRelay({
  server,
  adbPath,
  device,
  serverPath,
  accounts = [],
}) {
  const sessions = new Map();

  function ensureSession(account) {
    const id = Number(account.id);
    const existing = sessions.get(id);
    if (existing?.appPackage === account.packageName) return existing;
    if (existing) existing.disable().catch(() => { });
    const session = createSession({
      id,
      adbPath,
      device,
      serverPath,
      appPackage: account.packageName,
    });
    sessions.set(id, session);
    return session;
  }

  async function removeSession(id) {
    const session = sessions.get(Number(id));
    if (!session) return false;
    sessions.delete(Number(id));
    await session.disable();
    return true;
  }

  for (const account of accounts) {
    if (account.enabled !== false) ensureSession(account);
  }

  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (socket, request, sessionId) => {
    sessions.get(sessionId)?.addSocket(socket);
  });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "/", "http://localhost");
    const match = /^\/scrcpy\/(\d+)$/.exec(url.pathname);
    if (!match) {
      socket.destroy();
      return;
    }
    const sessionId = Number(match[1]);
    if (!sessions.has(sessionId)) {
      socket.destroy();
      return;
    }
    wss.handleUpgrade(request, socket, head, (webSocket) => {
      wss.emit("connection", webSocket, request, sessionId);
    });
  });

  server.once("close", () => {
    for (const session of sessions.values()) session.cleanup().catch(() => { });
  });

  return {
    ensureSession,
    getSession(id) {
      return sessions.get(Number(id));
    },
    listStates() {
      return [...sessions.values()].map((session) => session.getState());
    },
    removeSession,
  };
}
