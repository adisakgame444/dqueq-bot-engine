import {
  WebCodecsVideoDecoder,
  WebGLVideoFrameRenderer,
} from "@yume-chan/scrcpy-decoder-webcodecs";

const DEVICE_WIDTH = 900;
const DEVICE_HEIGHT = 1920;
const isAppView = document.body.dataset.view === "app" || document.body.dataset.view === "app-ios";
const isIosView = document.body.dataset.view === "app-ios";
const IOS_TOP_CROP = 0;
const Y_OFFSET = isIosView ? IOS_TOP_CROP : 0;
const DEVICE_VISIBLE_HEIGHT = isIosView
  ? DEVICE_HEIGHT - IOS_TOP_CROP
  : isAppView
    ? 1778
    : DEVICE_HEIGHT;
const H264_CODEC = 1748121140;
const accountMatch = /^\/(?:account|app|app-ios)\/(\d+)$/.exec(location.pathname);
const SESSION_ID = accountMatch ? Number(accountMatch[1]) : 1;
const configuredAgentOrigin =
  window.__DQUEUE_AGENT_URL__ ||
  document.querySelector('meta[name="dqueue-agent-url"]')?.content ||
  "";
const AGENT_HTTP_ORIGIN = String(configuredAgentOrigin || location.origin).replace(/\/+$/, "");
const AGENT_WS_ORIGIN = AGENT_HTTP_ORIGIN.replace(/^https:/, "wss:").replace(/^http:/, "ws:");
const API_BASE = `${AGENT_HTTP_ORIGIN}/api/account/${SESSION_ID}`;
const screen = document.getElementById("screen");
const canvas = document.getElementById("stream");
const device = document.getElementById("device");
const loading = document.getElementById("loading");
const keyboardCapture = document.getElementById("keyboard-capture");
const status = document.getElementById("status");
const statusText = document.getElementById("status-text");
const streamMode = document.getElementById("stream-mode");
const lastAction = document.getElementById("last-action");
const accountLinks = document.getElementById("account-links");
const fullscreenPrompt = document.getElementById("fullscreen-prompt");
const fullscreenButton = document.getElementById("enter-fullscreen");
const fullscreenMessage = document.getElementById("fullscreen-message");
const appStatusTime = document.getElementById("app-status-time");
const appStatusBattery = document.getElementById("app-status-battery");
let pointerStart = null;
let pointerMoved = false;
let stopped = false;
let streamActive = false;
let keyQueue = Promise.resolve();
let decoder;
let decoderWriter;
let socket;
let fallbackReason = "";
let waitingForKeyframe = true;
let fallbackTimer;

function setLastAction(message) {
  if (lastAction) lastAction.textContent = message;
}

function updateAppStatusTime() {
  if (!appStatusTime) return;
  const formattedTime = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  appStatusTime.textContent = isIosView ? formattedTime : `${formattedTime} น.`;
}

function updateDebug(extra = {}) {
  window.__dqueqRemoteDebug = {
    streamActive,
    fallbackReason,
    framesRendered: decoder?.framesRendered || 0,
    framesSkipped: decoder?.framesSkipped || 0,
    socketState: socket?.readyState,
    ...extra,
  };
}

async function apiInput(payload) {
  const response = await fetch(`${API_BASE}/input`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
}

function point(event) {
  const rect = device.getBoundingClientRect();
  return {
    x: Math.round(((event.clientX - rect.left) / rect.width) * DEVICE_WIDTH),
    y: Y_OFFSET + Math.round(
      ((event.clientY - rect.top) / rect.height) * DEVICE_VISIBLE_HEIGHT
    ),
    time: Date.now(),
  };
}

async function sendPointerGesture(start, end) {
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  try {
    if (distance < 18) {
      await apiInput({ type: "tap", x: end.x, y: end.y });
      setLastAction(`Tap ${end.x}, ${end.y}`);
    } else {
      const duration = Math.max(100, Math.min(1200, end.time - start.time));
      await apiInput({
        type: "swipe",
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        duration,
      });
      setLastAction(`Swipe ${start.x},${start.y} -> ${end.x},${end.y}`);
    }
  } catch (error) {
    setLastAction(error.message);
  }
}

device.addEventListener("pointerdown", (event) => {
  device.focus();
  pointerStart = point(event);
  pointerMoved = false;
  device.setPointerCapture(event.pointerId);
});

device.addEventListener("pointermove", (event) => {
  if (!pointerStart) return;
  const current = point(event);
  if (Math.hypot(current.x - pointerStart.x, current.y - pointerStart.y) >= 18) {
    pointerMoved = true;
  }
});

device.addEventListener("pointerup", (event) => {
  if (!pointerStart) return;
  const start = pointerStart;
  const end = point(event);
  const isTap =
    !pointerMoved && Math.hypot(end.x - start.x, end.y - start.y) < 18;
  pointerStart = null;
  pointerMoved = false;
  sendPointerGesture(start, end);
  if (isTap) {
    keyboardCapture.focus({ preventScroll: true });
  } else {
    keyboardCapture.blur();
  }
});

device.addEventListener("pointercancel", () => {
  pointerStart = null;
  pointerMoved = false;
  keyboardCapture.blur();
});

keyboardCapture.addEventListener("input", () => {
  const text = keyboardCapture.value;
  keyboardCapture.value = "";
  if (!text) return;

  keyQueue = keyQueue
    .then(() => apiInput({ type: "text", text }))
    .then(() => {
      setLastAction(`Typed ${text}`);
    })
    .catch((error) => {
      setLastAction(error.message);
    });
});

keyboardCapture.addEventListener("keydown", (event) => {
  let payload;
  if (event.key === "Backspace") {
    payload = { type: "key", key: "KEYCODE_DEL" };
  } else if (event.key === "Enter") {
    payload = { type: "key", key: "KEYCODE_ENTER" };
  } else if (event.key === "Escape") {
    payload = { type: "key", key: "KEYCODE_BACK" };
  }
  if (!payload) return;

  event.preventDefault();
  keyQueue = keyQueue
    .then(() => apiInput(payload))
    .then(() => {
      setLastAction(event.key);
    })
    .catch((error) => {
      setLastAction(error.message);
    });
});

function showPngFallback(reason) {
  streamActive = false;
  fallbackReason = reason || "";
  canvas.hidden = true;
  screen.hidden = isIosView ? true : false;
  loading.style.display = isIosView ? "none" : "grid";
  loading.textContent =
    reason === "waiting for virtual display"
      ? "กำลังเปิด DQueue..."
      : "กำลังเชื่อมต่อ DQueue...";
  streamMode.textContent = reason ? `Waiting: ${reason}` : "Waiting";
  if (!isIosView) startPngFallback();
  updateDebug();
}

function showLiveStream() {
  streamActive = true;
  fallbackReason = "";
  stopPngFallback();
  canvas.hidden = false;
  screen.hidden = true;
  loading.style.display = "none";
  streamMode.textContent = "scrcpy H.264 live";
  updateDebug();
}

function refreshPngFallback() {
  if (streamActive) return;
  screen.onload = () => {
    if (streamActive) return;
    screen.hidden = false;
    loading.style.display = "none";
    streamMode.textContent = fallbackReason
      ? `PNG fallback: ${fallbackReason}`
      : "PNG fallback";
    updateDebug({ fallbackImage: true });
  };
  screen.onerror = () => {
    if (streamActive) return;
    if (!isIosView) screen.hidden = true;
    loading.style.display = isIosView ? "none" : "grid";
    updateDebug({ fallbackImage: false });
  };
  screen.src = `${AGENT_HTTP_ORIGIN}/api/frame?t=${Date.now()}`;
}

function startPngFallback() {
  refreshPngFallback();
  if (!fallbackTimer) {
    fallbackTimer = window.setInterval(refreshPngFallback, 700);
  }
}

function stopPngFallback() {
  if (fallbackTimer) {
    window.clearInterval(fallbackTimer);
    fallbackTimer = undefined;
  }
}

async function disposeDecoder() {
  try {
    decoderWriter?.releaseLock();
  } catch {
    // Ignore a decoder that has already closed.
  }
  decoderWriter = undefined;
  decoder?.dispose();
  decoder = undefined;
}

function connectScrcpy() {
  if (!("VideoDecoder" in window) || !WebCodecsVideoDecoder.isSupported) {
    showPngFallback("WebCodecs is not supported");
    return;
  }

  socket = new WebSocket(`${AGENT_WS_ORIGIN}/scrcpy/${SESSION_ID}`);
  socket.binaryType = "arraybuffer";

  socket.addEventListener("message", async (event) => {
    if (typeof event.data === "string") {
      const message = JSON.parse(event.data);
      if (message.type === "state" && message.state === "error") {
        showPngFallback(message.detail);
        socket.close();
      }
      if (message.type === "metadata") {
        if (message.codec !== H264_CODEC) {
          showPngFallback("Unsupported video codec");
          socket.close();
          return;
        }
        await disposeDecoder();
        decoder = new WebCodecsVideoDecoder({
          codec: message.codec,
          renderer: new WebGLVideoFrameRenderer(canvas),
          hardwareAcceleration: "prefer-hardware",
        });
        decoderWriter = decoder.writable.getWriter();
        waitingForKeyframe = true;
      }
      return;
    }

    if (!decoderWriter) return;
    const raw = new Uint8Array(event.data);
    if (raw.length < 2) return;
    const kind = raw[0];
    const data = raw.slice(1);
    try {
      if (kind === 0) {
        await decoderWriter.write({ type: "configuration", data });
      } else {
        if (waitingForKeyframe && kind !== 2) return;
        if (kind === 2) waitingForKeyframe = false;
        await decoderWriter.write({
          type: "data",
          keyframe: kind === 2,
          data,
        });
        if (kind === 2) {
          // Mobile decoders can take longer than 50ms to report a rendered
          // frame. The server only sends this keyframe after DQueue is ready,
          // so reveal the canvas immediately and let the decoder paint it.
          showLiveStream();
        }
      }
    } catch (error) {
      console.error("scrcpy decoder failed", error);
      showPngFallback(error.message);
      socket.close();
    }
  });

  socket.addEventListener("close", () => {
    disposeDecoder();
    if (!stopped) {
      if (!fallbackReason) showPngFallback("stream disconnected");
      window.setTimeout(connectScrcpy, 2000);
    }
  });

  socket.addEventListener("error", () => {
    if (!fallbackReason) showPngFallback("stream unavailable");
  });
}

async function checkStatus() {
  if (!status || !statusText) return;
  try {
    const response = await fetch(`${API_BASE}/status`, { cache: "no-store" });
    const data = await response.json();
    status.classList.toggle("online", Boolean(data.ok));
    statusText.textContent = data.ok ? "Device online" : data.state || "Offline";
  } catch {
    status.classList.remove("online");
    statusText.textContent = "Server offline";
  }
}

async function loadAccountLinks() {
  if (!accountLinks) return;
  try {
    const response = await fetch(`${AGENT_HTTP_ORIGIN}/api/accounts`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok || !data.ok) return;
    accountLinks.innerHTML = [
      '<a href="/accounts">จัดการบัญชี</a>',
      ...data.accounts
        .filter((account) => account.enabled)
        .map(
          (account) =>
            `<a href="${account.url}">${account.name}</a>`
        ),
    ].join("");
    const current = data.accounts.find(
      (account) => account.id === SESSION_ID
    );
    if (current) {
      document.title = current.name;
      document.querySelector("h1").textContent = current.name;
    }
  } catch {
    // The stream remains usable when the account list cannot be refreshed.
  }
}

document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await apiInput({ type: "key", key: button.dataset.key });
      setLastAction(button.textContent);
    } catch (error) {
      setLastAction(error.message);
    }
  });
});

const launchButton = document.getElementById("launch");
if (launchButton) {
  launchButton.addEventListener("click", async () => {
    try {
      await apiInput({ type: "launch" });
      setLastAction("Opening DQueue");
    } catch (error) {
      setLastAction(error.message);
    }
  });
}

const sendTextButton = document.getElementById("send-text");
if (sendTextButton) {
  sendTextButton.addEventListener("click", async () => {
    const input = document.getElementById("text");
    if (!input?.value) return;
    try {
      await apiInput({ type: "text", text: input.value });
      setLastAction("Text sent");
      input.value = "";
    } catch (error) {
      setLastAction(error.message);
    }
  });
}

function updateFullscreenPrompt() {
  if (!fullscreenPrompt) return;
  const mobile = window.matchMedia("(max-width: 600px)").matches;
  const supported = Boolean(document.documentElement.requestFullscreen);
  fullscreenPrompt.hidden =
    !mobile || !supported || Boolean(document.fullscreenElement);
}

if (fullscreenButton) {
  fullscreenButton.addEventListener("click", async () => {
    fullscreenButton.disabled = true;
    if (fullscreenMessage) fullscreenMessage.textContent = "";
    try {
      if (!document.documentElement.requestFullscreen) {
        throw new Error("เบราว์เซอร์นี้ไม่รองรับโหมดเต็มหน้าจอ");
      }
      try {
        await document.documentElement.requestFullscreen({
          navigationUI: "show",
        });
      } catch {
        await document.documentElement.requestFullscreen();
      }
      if (window.screen.orientation?.lock) {
        window.screen.orientation.lock("portrait").catch(() => {});
      }
      updateFullscreenPrompt();
    } catch (error) {
      if (fullscreenMessage) {
        fullscreenMessage.textContent =
          error?.message || "ไม่สามารถเปิดเต็มหน้าจอได้";
      }
    } finally {
      fullscreenButton.disabled = false;
    }
  });
  document.addEventListener("fullscreenchange", () => {
    updateFullscreenPrompt();
  });
  window.addEventListener("resize", () => {
    updateFullscreenPrompt();
  });
  updateFullscreenPrompt();
}

window.addEventListener("beforeunload", () => {
  stopped = true;
  socket?.close();
  disposeDecoder();
});

checkStatus();
loadAccountLinks();
if (document.body.dataset.view !== "app") {
  document.title = `DQueue Account ${SESSION_ID}`;
}
document.querySelector("h1").textContent = `DQueue Account ${SESSION_ID}`;
document.querySelector(".meta").textContent =
  `BlueStacks Android 11 · Virtual display session ${SESSION_ID}`;
window.setInterval(checkStatus, 3000);
showPngFallback("waiting for virtual display");
updateAppStatusTime();
if (appStatusTime) window.setInterval(updateAppStatusTime, 15_000);

function updateAppStatusBattery() {
  if (!appStatusBattery) return;
  const chargingIcon = document.getElementById("battery-charging-icon");
  const iosBatteryFill = document.getElementById("ios-battery-fill");
  if (navigator.getBattery) {
    navigator.getBattery().then((battery) => {
      const update = () => {
        const level = Math.round(battery.level * 100);
        appStatusBattery.textContent = level;
        if (iosBatteryFill) {
          iosBatteryFill.style.width = `${level}%`;
          if (level <= 20) {
            iosBatteryFill.style.backgroundColor = "#ef4444";
          } else {
            iosBatteryFill.style.backgroundColor = "#22c55e";
          }
        }
        if (chargingIcon) {
          chargingIcon.hidden = !battery.charging;
        }
      };
      update();
      battery.addEventListener("levelchange", update);
      battery.addEventListener("chargingchange", update);
    });
  }
}
updateAppStatusBattery();

connectScrcpy();
