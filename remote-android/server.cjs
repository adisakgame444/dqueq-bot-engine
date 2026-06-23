const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { execFile } = require("child_process");
const accountStore = require("./account-store.cjs");
const { buildClone } = require("./clone-builder.cjs");

const HOST = process.env.REMOTE_ANDROID_HOST || "127.0.0.1";
const PORT = Number(process.env.REMOTE_ANDROID_PORT || "5100");
const DATA_DIR = process.env.DQUEUE_DATA_DIR || path.resolve(__dirname, "..");
const PUBLIC_TUNNEL_FILE =
  process.env.DQUEUE_PUBLIC_TUNNEL_FILE ||
  path.join(DATA_DIR, "public-tunnel.json");
const ADB_PATH =
  process.env.ADB_PATH || "C:\\Program Files\\BlueStacks_nxt\\HD-Adb.exe";
const DEVICE = process.env.ANDROID_DEVICE || "127.0.0.1:5556";
const ALLOWED_ORIGINS = (process.env.REMOTE_ANDROID_ALLOWED_ORIGINS || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const CLIENT_FILE = path.join(__dirname, "client", "index-v2.html");
const APP_CLIENT_FILE = path.join(__dirname, "client", "app-only.html");
const APP_IOS_CLIENT_FILE = path.join(__dirname, "client", "app-ios.html");
const ACCOUNTS_CLIENT_FILE = path.join(
  __dirname,
  "client",
  "accounts.html"
);
const CLIENT_SCRIPT_FILE = path.join(__dirname, "client", "stream-client.js");
const SW_FILE = path.join(__dirname, "client", "sw.js");
const ACCOUNTS_SCRIPT_FILE = path.join(
  __dirname,
  "client",
  "accounts.js"
);
const SCRCPY_SERVER_FILE = path.join(
  __dirname,
  "scrcpy-server-v3.3.3"
);
const MAX_BODY_BYTES = 16 * 1024;

let framePromise = null;
let lastFrame = null;
let lastFrameAt = 0;
let accountOperation = null;
let adbConnectPromise = null;

function adbOnce(args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      ADB_PATH,
      ["-s", DEVICE, ...args],
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

function connectAdb() {
  if (adbConnectPromise) return adbConnectPromise;
  adbConnectPromise = new Promise((resolve, reject) => {
    execFile(
      ADB_PATH,
      ["connect", DEVICE],
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

async function adb(args, options = {}) {
  if (DEVICE.includes(":")) {
    await connectAdb();
  }
  try {
    return await adbOnce(args, options);
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    const reconnectable =
      DEVICE.includes(":") &&
      /device .* not found|device offline|no devices\/emulators found/i.test(
        message
      );
    if (!reconnectable) throw error;
    await connectAdb();
    return adbOnce(args, options);
  }
}

async function captureFrame() {
  const now = Date.now();
  if (lastFrame && now - lastFrameAt < 120) return lastFrame;
  if (framePromise) return framePromise;

  framePromise = adb(["exec-out", "screencap", "-p"], {
    encoding: "buffer",
  })
    .then((frame) => {
      if (!Buffer.isBuffer(frame) || frame.length < 8) {
        throw new Error("ADB returned an invalid screenshot");
      }
      lastFrame = frame;
      lastFrameAt = Date.now();
      return frame;
    })
    .finally(() => {
      framePromise = null;
    });

  return framePromise;
}

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload));
  res.writeHead(status, {
    ...corsHeaders(),
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  });
  res.end(body);
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes("*")
      ? "*"
      : ALLOWED_ORIGINS.join(", "),
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Request body is too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const text = Buffer.concat(chunks).toString("utf8");
        resolve(text ? JSON.parse(text) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function integer(value, min, max, name) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${name} must be a number`);
  return String(Math.round(Math.min(max, Math.max(min, number))));
}

function readPublicTunnelOrigin() {
  try {
    const payload = JSON.parse(fs.readFileSync(PUBLIC_TUNNEL_FILE, "utf8"));
    const url = String(payload.url || "").trim().replace(/\/+$/, "");
    if (/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/i.test(url)) return url;
    if (/^https:\/\/[a-z0-9.-]+$/i.test(url)) return url;
  } catch {
    // The tunnel may still be starting. Local URLs remain available.
  }
  return "";
}

const iconCache = new Map();
function generatePngIcon(size) {
  const key = size;
  if (iconCache.has(key)) return iconCache.get(key);
  const { deflateSync } = require("zlib");
  const r = 0xeb, g = 0x5c, b = 0x24;
  const rowLen = 1 + size * 4;
  const raw = Buffer.alloc(rowLen * size);
  for (let y = 0; y < size; y++) {
    const offset = y * rowLen;
    raw[offset] = 0;
    for (let x = 0; x < size; x++) {
      const px = offset + 1 + x * 4;
      raw[px] = r; raw[px + 1] = g; raw[px + 2] = b; raw[px + 3] = 255;
    }
  }
  const compressed = deflateSync(raw);
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  function chunk(type, data) {
    const typeData = Buffer.concat([Buffer.from(type), data]);
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(typeData));
    return Buffer.concat([len, typeData, crc]);
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", compressed), chunk("IEND", Buffer.alloc(0))]);
  iconCache.set(key, png);
  return png;
}

async function isPackageInstalled(packageName) {
  return adb(["shell", "pm", "path", packageName])
    .then((output) => String(output).includes("package:"))
    .catch(() => false);
}

async function accountDetails(relay) {
  const accounts = accountStore.listAccounts();
  const publicOrigin = readPublicTunnelOrigin();
  return Promise.all(
    accounts.map(async (account) => {
      const url = `/account/${account.id}`;
      const appUrl = `/app/${account.id}`;
      const appIosUrl = `/app-ios/${account.id}`;
      return {
        ...account,
        installed: await isPackageInstalled(account.packageName),
        session: relay.getSession(account.id)?.getState() || null,
        url,
        appUrl,
        appIosUrl,
        publicUrl: publicOrigin ? `${publicOrigin}${url}` : "",
        publicAppUrl: publicOrigin ? `${publicOrigin}${appUrl}` : "",
        publicAppIosUrl: publicOrigin ? `${publicOrigin}${appIosUrl}` : "",
      };
    })
  );
}

function runExclusiveAccountOperation(operation) {
  if (accountOperation) {
    throw new Error("Another account operation is still running");
  }
  accountOperation = Promise.resolve()
    .then(operation)
    .finally(() => {
      accountOperation = null;
    });
  return accountOperation;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || HOST}`);
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }
  const accountMatch = /^\/account\/(\d+)$/.exec(url.pathname);
  const appMatch = /^\/app\/(\d+)$/.exec(url.pathname);
  const appIosMatch = /^\/app-ios\/(\d+)$/.exec(url.pathname);
  const apiAccountMatch = /^\/api\/account\/(\d+)\/(status|input)$/.exec(
    url.pathname
  );
  const accountAdminMatch = /^\/api\/accounts\/(\d+)$/.exec(url.pathname);

  try {
    if (req.method === "GET" && url.pathname === "/manifest.json") {
      const view = url.searchParams.get("view");
      const id = url.searchParams.get("id");
      let startUrl = "/";
      let appName = "DQueue";
      if (view && id) {
        const account = accountStore.getAccount(Number(id));
        if (account && account.name) appName = account.name;
        const version = view === "app-ios" ? "114" : "3";
        startUrl = `/${view}/${id}?v=${version}`;
      }
      const manifest = {
        id: startUrl.split("?")[0],
        name: appName,
        short_name: appName,
        start_url: startUrl,
        scope: "/",
        display: "standalone",
        display_override: ["standalone"],
        background_color: "#eb5c24",
        theme_color: "#eb5c24",
        orientation: "portrait",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      };
      sendJson(res, 200, manifest);
      return;
    }

    if (req.method === "GET" && url.pathname === "/accounts") {
      const html = fs.readFileSync(ACCOUNTS_CLIENT_FILE);
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": html.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      });
      res.end(html);
      return;
    }

    if (
      req.method === "GET" &&
      (url.pathname === "/" || accountMatch)
    ) {
      if (accountMatch) {
        const account = accountStore.getAccount(Number(accountMatch[1]));
        if (!account || !account.enabled) {
          sendJson(res, 404, {
            ok: false,
            error: "Account was not found or is disabled",
          });
          return;
        }
      }
      const accountLinks = accountStore
        .listAccounts()
        .filter((account) => account.enabled)
        .map(
          (account) =>
            `<a href="/account/${account.id}">${account.name}</a>`
        )
        .join("");
      const html = Buffer.from(
        fs
          .readFileSync(CLIENT_FILE, "utf8")
          .replace("<!--ACCOUNT_LINKS-->", accountLinks)
      );
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": html.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      });
      res.end(html);
      return;
    }

    if (req.method === "GET" && (appMatch || appIosMatch)) {
      const match = appMatch || appIosMatch;
      const accountId = Number(match[1]);
      const account = accountStore.getAccount(accountId);
      if (!account || !account.enabled) {
        sendJson(res, 404, {
          ok: false,
          error: "Account was not found or is disabled",
        });
        return;
      }
      const relay = await scrcpyRelayPromise;
      relay.getSession(accountId)?.start().catch(() => {
        // The WebSocket client will receive and report any startup error.
      });
      const safeName = account.name.replace(
        /[&<>"']/g,
        (character) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[character]
      );
      const targetFile = appMatch ? APP_CLIENT_FILE : APP_IOS_CLIENT_FILE;
      const viewType = appMatch ? "app" : "app-ios";
      const html = Buffer.from(
        fs
          .readFileSync(targetFile, "utf8")
          .replaceAll("__ACCOUNT_NAME__", safeName)
          .replace('href="/manifest.json"', `href="/manifest.json?view=${viewType}&amp;id=${accountId}&amp;v=${viewType === "app-ios" ? "114" : "3"}"`)
      );
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": html.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      });
      res.end(html);
      return;
    }

    if (req.method === "GET" && url.pathname === "/accounts.js") {
      const script = fs.readFileSync(ACCOUNTS_SCRIPT_FILE);
      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Content-Length": script.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      });
      res.end(script);
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/accounts") {
      const relay = await scrcpyRelayPromise;
      sendJson(res, 200, {
        ok: true,
        busy: Boolean(accountOperation),
        publicOrigin: readPublicTunnelOrigin(),
        accounts: await accountDetails(relay),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/accounts") {
      const relay = await scrcpyRelayPromise;
      const account = accountStore.nextAccount();
      const result = await runExclusiveAccountOperation(async () => {
        await buildClone({
          account,
          adbPath: ADB_PATH,
          device: DEVICE,
        });
        const stored = accountStore.addAccount(account);
        relay.ensureSession(stored);
        return stored;
      });
      sendJson(res, 201, { ok: true, account: result });
      return;
    }

    if (accountAdminMatch && req.method === "PATCH") {
      const id = Number(accountAdminMatch[1]);
      const payload = await readJson(req);
      if (typeof payload.enabled !== "boolean") {
        throw new Error("enabled must be true or false");
      }
      const relay = await scrcpyRelayPromise;
      const account = accountStore.getAccount(id);
      if (!account) throw new Error(`Account ${id} was not found`);
      if (payload.enabled) {
        if (!(await isPackageInstalled(account.packageName))) {
          throw new Error("The Android app for this account is not installed");
        }
        const updated = accountStore.updateAccount(id, { enabled: true });
        relay.ensureSession(updated);
        sendJson(res, 200, { ok: true, account: updated });
      } else {
        await relay.removeSession(id);
        const updated = accountStore.updateAccount(id, { enabled: false });
        sendJson(res, 200, { ok: true, account: updated });
      }
      return;
    }

    if (accountAdminMatch && req.method === "DELETE") {
      const id = Number(accountAdminMatch[1]);
      const payload = await readJson(req);
      const account = accountStore.getAccount(id);
      if (!account) throw new Error(`Account ${id} was not found`);
      if (account.protected) throw new Error("Account 1 cannot be deleted");
      if (payload.confirm !== `DELETE ACCOUNT ${id}`) {
        throw new Error(`Type DELETE ACCOUNT ${id} to confirm`);
      }
      const relay = await scrcpyRelayPromise;
      await runExclusiveAccountOperation(async () => {
        await relay.removeSession(id);
        if (await isPackageInstalled(account.packageName)) {
          await adb(["uninstall", account.packageName]);
        }
        accountStore.removeAccount(id);
      });
      sendJson(res, 200, {
        ok: true,
        message: `Account ${id} was deleted from Android`,
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/sw.js") {
      const script = fs.readFileSync(SW_FILE);
      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Content-Length": script.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Service-Worker-Allowed": "/",
      });
      res.end(script);
      return;
    }

    if (req.method === "GET" && /^\/icon-(192|512)\.png$/.test(url.pathname)) {
      const size = Number(url.pathname.match(/\d+/)[0]);
      const png = generatePngIcon(size);
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": png.length,
        "Cache-Control": "public, max-age=86400",
      });
      res.end(png);
      return;
    }

    if (req.method === "GET" && url.pathname === "/stream-client.js") {
      const script = fs.readFileSync(CLIENT_SCRIPT_FILE);
      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Content-Length": script.length,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      });
      res.end(script);
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/frame") {
      const frame = await captureFrame();
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": frame.length,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      });
      res.end(frame);
      return;
    }

    if (
      req.method === "GET" &&
      (url.pathname === "/api/status" ||
        (apiAccountMatch && apiAccountMatch[2] === "status"))
    ) {
      const sessionId = apiAccountMatch ? Number(apiAccountMatch[1]) : 1;
      const account = accountStore.getAccount(sessionId);
      if (!account || !account.enabled) {
        sendJson(res, 404, {
          ok: false,
          state: "disabled",
          error: "Account was not found or is disabled",
        });
        return;
      }
      const scrcpy = await scrcpyRelayPromise
        .then(
          (relay) =>
            relay.getSession(sessionId)?.getState() || {
              state: "idle",
              detail: "Waiting for session",
              clients: 0,
            }
        )
        .catch((error) => ({
          state: "error",
          detail: String(error && error.message ? error.message : error),
          clients: 0,
        }));
      let state = "device";
      let ok = scrcpy.state === "starting" || scrcpy.state === "streaming";
      if (!ok) {
        state = String(await adb(["get-state"])).trim();
        ok = state === "device";
      }
      sendJson(res, 200, {
        ok,
        state,
        device: DEVICE,
        session: sessionId,
        width: 900,
        height: 1920,
        scrcpy,
      });
      return;
    }

    if (
      req.method === "POST" &&
      (url.pathname === "/api/input" ||
        (apiAccountMatch && apiAccountMatch[2] === "input"))
    ) {
      const sessionId = apiAccountMatch ? Number(apiAccountMatch[1]) : 1;
      const account = accountStore.getAccount(sessionId);
      if (!account || !account.enabled) {
        throw new Error("Account was not found or is disabled");
      }
      const payload = await readJson(req);
      const relay = await scrcpyRelayPromise;
      const session = relay.getSession(sessionId);
      if (!session) throw new Error("Unknown account session");
      const handledByScrcpy = await session.handleInput(payload);
      if (!handledByScrcpy) {
        throw new Error("Virtual display control is not ready");
      }
      sendJson(res, 200, {
        ok: true,
        transport: handledByScrcpy ? "scrcpy" : "adb",
      });
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found" });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  }
});

const scrcpyRelayPromise = import("./multi-scrcpy-relay.mjs").then(
  ({ attachMultiScrcpyRelay }) =>
    attachMultiScrcpyRelay({
      server,
      adbPath: ADB_PATH,
      device: DEVICE,
      serverPath: SCRCPY_SERVER_FILE,
      accounts: accountStore
        .listAccounts()
        .filter((account) => account.enabled),
    })
);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Open http://${HOST}:${PORT} or stop the existing server first.`
    );
    process.exitCode = 1;
    return;
  }
  throw error;
});

server.listen(PORT, HOST, () => {
  console.log(`Remote Android: http://${HOST}:${PORT}`);
  console.log(`Account manager: http://${HOST}:${PORT}/accounts`);
  console.log(`ADB: ${ADB_PATH}`);
  console.log(`Device: ${DEVICE}`);
  console.log(
    `Account apps: ${accountStore
      .listAccounts()
      .map((account) => account.packageName)
      .join(", ")}`
  );
});

module.exports = { server, scrcpyRelayPromise };
