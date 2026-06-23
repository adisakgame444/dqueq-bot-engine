const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { spawn } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const externalDataDir = app.isPackaged
  ? (process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(process.execPath))
  : rootDir;
const bundledCloudflaredDir = app.isPackaged
  ? path.join(process.resourcesPath, "cloudflared")
  : path.join(rootDir, "launcher-assets", "cloudflared");
const runtimeCloudflaredDir = path.join(externalDataDir, "cloudflared");
const publicTunnelFile = path.join(externalDataDir, "public-tunnel.json");
const webUrl = "http://localhost:5000";
const remoteBaseUrl = `http://${process.env.REMOTE_ANDROID_HOST || "127.0.0.1"}:${process.env.REMOTE_ANDROID_PORT || "5100"}`;
const accountsUrl = `${remoteBaseUrl}/accounts`;

let mainWindow;
let webProcess = null;
let botProcess = null;
let remoteProcess = null;
let tunnelProcess = null;
let webManaged = false;
let webPollTimer = null;
let remotePollTimer = null;
let runtimeEnvCache = null;

const state = {
  web: "stopped",
  bot: "stopped",
  remote: "stopped",
  tunnel: "stopped",
};

function parseDotEnv(content) {
  const values = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index <= 0) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function loadRuntimeEnv() {
  const envFile = path.join(externalDataDir, ".env");
  try {
    const values = parseDotEnv(fs.readFileSync(envFile, "utf8"));
    runtimeEnvCache = values;
    send("config-status", { mode: "plain", ready: true });
    return values;
  } catch {
    if (runtimeEnvCache) {
      send("config-status", { mode: "encrypted", ready: true });
      return runtimeEnvCache;
    }

    const encryptedFile = findEncryptedConfigFile();
    if (encryptedFile) {
      send("config-status", { mode: "encrypted", ready: false });
      log("system", "พบ config เข้ารหัส กรุณาใส่รหัสปลดล็อกก่อนเริ่มระบบ");
      return null;
    }

    send("config-status", { mode: "missing", ready: false });
    log("system", `ไม่พบ .env หรือ dqueue-config.enc ที่ ${externalDataDir}`);
    return null;
  }
}

function findEncryptedConfigFile() {
  const candidates = [
    path.join(externalDataDir, "dqueue-config.enc"),
    path.join(rootDir, "dqueue-config.enc"),
  ];
  return candidates.find((filePath) => fs.existsSync(filePath)) || null;
}

function decryptEncryptedConfig(password) {
  const encryptedFile = findEncryptedConfigFile();
  if (!encryptedFile) {
    throw new Error("ไม่พบ dqueue-config.enc");
  }

  const payload = JSON.parse(fs.readFileSync(encryptedFile, "utf8"));
  if (payload.version !== 1 || payload.cipher !== "aes-256-gcm") {
    throw new Error("รูปแบบ config เข้ารหัสไม่ถูกต้อง");
  }

  const key = crypto.pbkdf2Sync(
    password,
    Buffer.from(payload.salt, "base64"),
    Number(payload.iterations || 210000),
    32,
    "sha256"
  );
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(payload.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.data, "base64")),
    decipher.final(),
  ]).toString("utf8");

  runtimeEnvCache = parseDotEnv(plaintext);
  send("config-status", { mode: "encrypted", ready: true });
  log("system", "ปลดล็อก config สำเร็จ");
  return runtimeEnvCache;
}

function send(channel, payload) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send(channel, payload);
}

function log(source, message) {
  const text = String(message || "").trimEnd();
  if (!text) return;
  send("log", {
    source,
    message: text,
    time: new Date().toLocaleTimeString("th-TH", { hour12: false }),
  });
}

function setStatus(part, value) {
  state[part] = value;
  send("status", state);
}

function isUrlReachable(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 1500 }, (res) => {
      res.resume();
      resolve(true);
    });
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.on("error", () => resolve(false));
  });
}

function isWebReachable() {
  return isUrlReachable(webUrl);
}

function isRemoteReachable() {
  return isUrlReachable(accountsUrl);
}

async function waitForRemoteReady(timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isRemoteReachable()) return true;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

function writePublicTunnelUrl(url) {
  try {
    fs.writeFileSync(
      publicTunnelFile,
      JSON.stringify({ url, updatedAt: new Date().toISOString() }, null, 2),
      "utf8"
    );
  } catch (error) {
    log("tunnel", `Unable to write public tunnel URL: ${error.message}`);
  }
}

function clearPublicTunnelUrl() {
  try {
    if (fs.existsSync(publicTunnelFile)) fs.unlinkSync(publicTunnelFile);
  } catch {
    // Best effort only. The next successful tunnel run will overwrite it.
  }
}

function extractPublicTunnelUrl(text) {
  const match = String(text).match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
  return match ? match[0] : null;
}

function nodeCommand(scriptPath, args) {
  fs.mkdirSync(externalDataDir, { recursive: true });
  const runtimeEnv = loadRuntimeEnv();
  if (!runtimeEnv) {
    throw new Error("config ยังไม่พร้อม");
  }
  return spawn(process.execPath, [scriptPath, ...args], {
    cwd: rootDir,
    env: {
      ...process.env,
      ...runtimeEnv,
      DQUEUE_DATA_DIR: externalDataDir,
      DQUEUE_PUBLIC_TUNNEL_FILE: publicTunnelFile,
      ELECTRON_RUN_AS_NODE: "1",
      FORCE_COLOR: "0",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    shell: false,
    windowsHide: true,
  });
}

async function startWeb() {
  if (webProcess) return;

  if (await isWebReachable()) {
    webManaged = false;
    setStatus("web", "running");
    log("web", `ใช้ web server ที่เปิดอยู่แล้ว: ${webUrl}`);
    return;
  }

  webManaged = true;
  setStatus("web", "starting");
  log("web", "กำลังรัน Next local server");

  const nextCli = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
  const nextArgs = app.isPackaged ? ["start", "-p", "5000"] : ["dev", "-p", "5000"];
  try {
    webProcess = nodeCommand(nextCli, nextArgs);
  } catch (error) {
    log("web", error.message);
    setStatus("web", "stopped");
    return;
  }
  webProcess.stdout.on("data", (data) => log("web", data));
  webProcess.stderr.on("data", (data) => log("web", data));
  webProcess.on("error", (error) => {
    log("web", error.message);
    setStatus("web", "error");
  });
  webProcess.on("exit", (code, signal) => {
    log("web", `หยุดทำงาน code=${code ?? "-"} signal=${signal ?? "-"}`);
    webProcess = null;
    webManaged = false;
    setStatus("web", code === 0 ? "stopped" : "error");
  });
}

function startBot() {
  if (botProcess) return;

  setStatus("bot", "starting");
  log("bot", "กำลังรัน Telegram bot");

  const tsxCli = path.join(rootDir, "node_modules", "tsx", "dist", "cli.cjs");
  try {
    botProcess = nodeCommand(tsxCli, ["src\\telegram_commander.ts"]);
  } catch (error) {
    log("bot", error.message);
    setStatus("bot", "stopped");
    return;
  }
  botProcess.stdout.on("data", (data) => log("bot", data));
  botProcess.stderr.on("data", (data) => log("bot", data));
  botProcess.on("error", (error) => {
    log("bot", error.message);
    setStatus("bot", "error");
  });
  botProcess.on("exit", (code, signal) => {
    log("bot", `หยุดทำงาน code=${code ?? "-"} signal=${signal ?? "-"}`);
    botProcess = null;
    setStatus("bot", code === 0 ? "stopped" : "error");
  });
}

async function startRemote() {
  if (remoteProcess) return;

  if (await isRemoteReachable()) {
    setStatus("remote", "running");
    log("remote", `ใช้ remote server ที่เปิดอยู่แล้ว: ${accountsUrl}`);
    return;
  }

  setStatus("remote", "starting");
  log("remote", "กำลังรัน Remote Android local agent");

  const remoteServer = path.join(rootDir, "remote-android", "server.cjs");
  try {
    remoteProcess = nodeCommand(remoteServer, []);
  } catch (error) {
    log("remote", error.message);
    setStatus("remote", "stopped");
    return;
  }

  remoteProcess.stdout.on("data", (data) => log("remote", data));
  remoteProcess.stderr.on("data", (data) => log("remote", data));
  remoteProcess.on("error", (error) => {
    log("remote", error.message);
    setStatus("remote", "error");
  });
  remoteProcess.on("exit", (code, signal) => {
    log("remote", `หยุดทำงาน code=${code ?? "-"} signal=${signal ?? "-"}`);
    remoteProcess = null;
    setStatus("remote", code === 0 ? "stopped" : "error");
  });
}

function resolveCloudflaredPath(runtimeEnv) {
  const configured = runtimeEnv.CLOUDFLARED_PATH || process.env.CLOUDFLARED_PATH;
  const candidates = [
    configured,
    path.join(runtimeCloudflaredDir, "cloudflared.exe"),
    path.join(bundledCloudflaredDir, "cloudflared.exe"),
    path.join(externalDataDir, "cloudflared.exe"),
    path.join(rootDir, "cloudflared.exe"),
    "cloudflared",
  ].filter(Boolean);
  return candidates.find((candidate) => candidate === "cloudflared" || fs.existsSync(candidate)) || candidates[0];
}

function yamlPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function prepareBundledCloudflared() {
  const bundledExe = path.join(bundledCloudflaredDir, "cloudflared.exe");
  if (!fs.existsSync(bundledExe)) return null;

  fs.mkdirSync(runtimeCloudflaredDir, { recursive: true });

  const runtimeExe = path.join(runtimeCloudflaredDir, "cloudflared.exe");
  if (!fs.existsSync(runtimeExe)) fs.copyFileSync(bundledExe, runtimeExe);

  return {
    exePath: runtimeExe,
  };
}

function startTunnel() {
  if (tunnelProcess) return;

  const runtimeEnv = loadRuntimeEnv();
  if (!runtimeEnv) return;

  clearPublicTunnelUrl();

  const bundledCloudflared = prepareBundledCloudflared();
  const configuredConfig = runtimeEnv.CLOUDFLARED_CONFIG || process.env.CLOUDFLARED_CONFIG;
  const useNamedTunnel = runtimeEnv.CLOUDFLARED_MODE === "named" || Boolean(configuredConfig);
  const service = runtimeEnv.CLOUDFLARED_SERVICE || remoteBaseUrl;
  const configPath =
    configuredConfig ||
    path.join(process.env.USERPROFILE || "", ".cloudflared", "config.yml");
  const cloudflaredPath = bundledCloudflared?.exePath || resolveCloudflaredPath(runtimeEnv);
  const tunnelArgs = useNamedTunnel
    ? [
        "tunnel",
        "--protocol",
        "http2",
        "--config",
        configPath,
        "run",
      ]
    : ["tunnel", "--no-autoupdate", "--url", service];

  setStatus("tunnel", "starting");
  log("tunnel", "กำลังรัน Cloudflare tunnel");

  tunnelProcess = spawn(
    cloudflaredPath,
    tunnelArgs,
    {
      cwd: externalDataDir,
      env: {
        ...process.env,
        ...runtimeEnv,
        FORCE_COLOR: "0",
      },
      shell: false,
      windowsHide: true,
    }
  );
  tunnelProcess.stdout.on("data", (data) => {
    const text = String(data);
    log("tunnel", text);
    const publicUrl = extractPublicTunnelUrl(text);
    if (publicUrl) {
      writePublicTunnelUrl(publicUrl);
      log("tunnel", `Public link ready: ${publicUrl}`);
    }
    setStatus("tunnel", "running");
  });
  tunnelProcess.stderr.on("data", (data) => {
    const text = String(data);
    log("tunnel", text);
    const publicUrl = extractPublicTunnelUrl(text);
    if (publicUrl) {
      writePublicTunnelUrl(publicUrl);
      log("tunnel", `Public link ready: ${publicUrl}`);
    }
    setStatus("tunnel", "running");
  });
  tunnelProcess.on("error", (error) => {
    log("tunnel", `${error.message}. ตั้งค่า CLOUDFLARED_PATH หรือวาง cloudflared.exe ข้างไฟล์โปรแกรม`);
    tunnelProcess = null;
    setStatus("tunnel", "error");
  });
  tunnelProcess.on("exit", (code, signal) => {
    log("tunnel", `หยุดทำงาน code=${code ?? "-"} signal=${signal ?? "-"}`);
    tunnelProcess = null;
    if (code !== 0) clearPublicTunnelUrl();
    setStatus("tunnel", code === 0 ? "stopped" : "error");
  });
}

async function startAll() {
  const runtimeEnv = loadRuntimeEnv();
  if (!runtimeEnv) return;
  await startRemote();
  if (!(await waitForRemoteReady())) {
    log("remote", "Remote Android local agent did not become ready on port 5100");
    setStatus("remote", "error");
    return;
  }
  startTunnel();
  if (runtimeEnv.DQUEUE_START_WEB === "1") await startWeb();
  if (runtimeEnv.DQUEUE_START_TELEGRAM_BOT === "1") startBot();
}

function stopProcess(child, source) {
  if (!child) return;
  log(source, "กำลังหยุด process");
  if (process.platform === "win32" && child.pid) {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      windowsHide: true,
      shell: false,
    });
    return;
  }
  child.kill();
}

function stopAll() {
  if (webManaged) stopProcess(webProcess, "web");
  stopProcess(botProcess, "bot");
  stopProcess(remoteProcess, "remote");
  stopProcess(tunnelProcess, "tunnel");
  if (!webManaged) setStatus("web", "stopped");
}

function startWebPolling() {
  if (webPollTimer) clearInterval(webPollTimer);
  webPollTimer = setInterval(async () => {
    if (await isWebReachable()) {
      setStatus("web", "running");
    } else if (!webProcess) {
      setStatus("web", "stopped");
    }
  }, 2500);
}

function startRemotePolling() {
  if (remotePollTimer) clearInterval(remotePollTimer);
  remotePollTimer = setInterval(async () => {
    if (await isRemoteReachable()) {
      setStatus("remote", "running");
    } else if (!remoteProcess) {
      setStatus("remote", "stopped");
    }
  }, 2500);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 940,
    height: 680,
    minWidth: 760,
    minHeight: 520,
    title: "DQueue Bot Manager Launcher",
    backgroundColor: "#f4f7fb",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer.html"));
  mainWindow.webContents.once("did-finish-load", () => {
    send("status", state);
    log("system", `Data folder: ${externalDataDir}`);
    startAll();
  });
}

ipcMain.handle("start-all", async () => startAll());
ipcMain.handle("stop-all", () => stopAll());
ipcMain.handle("open-web", () => shell.openExternal(webUrl));
ipcMain.handle("open-accounts", () => shell.openExternal(accountsUrl));
ipcMain.handle("status", () => state);
ipcMain.handle("unlock-config", (_event, password) => {
  try {
    decryptEncryptedConfig(String(password || ""));
    return { ok: true };
  } catch (error) {
    runtimeEnvCache = null;
    send("config-status", { mode: "encrypted", ready: false });
    log("system", `ปลดล็อก config ไม่สำเร็จ: ${error.message}`);
    return { ok: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();
  startWebPolling();
  startRemotePolling();
});

app.on("window-all-closed", () => {
  stopAll();
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  stopAll();
  if (webPollTimer) clearInterval(webPollTimer);
  if (remotePollTimer) clearInterval(remotePollTimer);
});
