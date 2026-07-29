const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { PROJECT_ROOT, loadCloneAssets } = require("./clone-assets.cjs");

const BUNDLED_JAVA = process.env.DQUEUE_JRE_PATH
  ? path.join(process.env.DQUEUE_JRE_PATH, "bin", "java.exe")
  : path.join(PROJECT_ROOT, "launcher-assets", "jre", "bin", "java.exe");
const JAVA_PATH = fs.existsSync(BUNDLED_JAVA) ? BUNDLED_JAVA : "java";
const TOOLS_ROOT = path.join(PROJECT_ROOT, "scratch", "tools");
const GENERATED_ROOT = process.env.DQUEUE_DATA_DIR
  ? path.join(process.env.DQUEUE_DATA_DIR, "remote-android", "generated", "accounts")
  : path.join(__dirname, "generated", "accounts");
const APKTOOL_INCOMPATIBLE_LINES = [
  /<item\s+name="android:windowOptOutEdgeToEdgeEnforcement">.*?<\/item>\s*/g,
];
const CLONE_COMMAND_TIMEOUT_MS = Number(
  process.env.DQUEUE_CLONE_COMMAND_TIMEOUT_MS || "120000"
);
const TEXT_TEMPLATE_EXTENSIONS = new Set([
  ".xml",
  ".smali",
  ".json",
  ".properties",
  ".html",
  ".js",
  ".css",
]);

function run(file, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      file,
      args,
      {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        maxBuffer: 24 * 1024 * 1024,
        timeout: options.timeout || CLONE_COMMAND_TIMEOUT_MS,
        windowsHide: true,
        ...options,
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

function assertFiles(files) {
  for (const file of files) {
    if (!fs.existsSync(file)) throw new Error(`Required file is missing: ${file}`);
  }
}

function listTemplateTextFiles(root, files = []) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const item = path.join(root, entry.name);
    if (entry.isDirectory()) {
      listTemplateTextFiles(item, files);
    } else if (TEXT_TEMPLATE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(item);
    }
  }
  return files;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replacePackageReferences(source, sourcePackage, packageName) {
  return source.replace(new RegExp(escapeRegExp(sourcePackage), "g"), packageName);
}

function restoreSourceComponentClasses(source, sourcePackage, packageName) {
  const clonePrefix = escapeRegExp(`${packageName}.`);
  const componentPattern = new RegExp(
    `(<(?:activity|service|receiver|provider)\\b[^>]*\\bandroid:name=")${clonePrefix}([^"\\s]+)(")`,
    "g"
  );
  return source.replace(componentPattern, `$1${sourcePackage}.$2$3`);
}

function sanitizeTemplateForApktool(assets) {
  const stylesFile = path.join(assets.parts[0].decodedPath, "res", "values", "styles.xml");
  if (!fs.existsSync(stylesFile)) return;

  const source = fs.readFileSync(stylesFile, "utf8");
  let normalized = source;
  for (const pattern of APKTOOL_INCOMPATIBLE_LINES) {
    normalized = normalized.replace(pattern, "");
  }
  if (normalized !== source) fs.writeFileSync(stylesFile, normalized, "utf8");
}

function createInjectionScript(packageName) {
  // Keep the bridge separate from the app bundle and defer it until the page is
  // usable.  This is important for the Android WebView: an inline async fetch
  // in <head> can run before Cordova finishes creating its web context.
  return `<script src="dqueue-token-bridge.js" defer data-dqueue-package="${packageName}"></script>`;
}

function createTokenBridgeScript(packageName) {
  const encodedPackage = JSON.stringify(packageName);
  return `
(function () {
  "use strict";

  var packageName = ${encodedPackage};
  var agentUrls = [
    "http://localhost:5100",
    "http://127.0.0.1:5100",
    "http://10.0.2.2:5100"
  ];
  var completed = false;
  var requestInFlight = false;
  var retryDelayMs = 2000;

  function saveLogin(data) {
    if (!data || !data.jwtToken) return false;
    completed = true;
    localStorage.setItem("jwtToken", data.jwtToken);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", JSON.stringify(data.user || {}));
    window.location.reload();
    return true;
  }

  function requestToken() {
    if (completed || requestInFlight) return;
    requestInFlight = true;
    var index = 0;
    function scheduleRetry() {
      requestInFlight = false;
      if (!completed) window.setTimeout(requestToken, retryDelayMs);
    }
    function tryNextAgent() {
      if (completed) return;
      if (index >= agentUrls.length) {
        scheduleRetry();
        return;
      }
      var agentUrl = agentUrls[index++];
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        agentUrl + "/api/accounts/get-token?packageName=" + encodeURIComponent(packageName),
        true
      );
      request.timeout = 4000;
      request.onreadystatechange = function () {
        if (request.readyState !== 4 || completed) return;
        if (request.status >= 200 && request.status < 300) {
          try {
            if (saveLogin(JSON.parse(request.responseText))) return;
          } catch (_) {}
        }
        tryNextAgent();
      };
      request.onerror = tryNextAgent;
      request.ontimeout = tryNextAgent;
      try {
        request.send();
      } catch (_) {
        tryNextAgent();
      }
    }
    tryNextAgent();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", requestToken, { once: true });
  } else {
    window.setTimeout(requestToken, 250);
  }
})();
`;
}

async function ensureInstallTarget(adbPath, device) {
  // TCP ADB targets disappear when the ADB daemon restarts while APKs are building.
  // Reconnect immediately before install so clone creation is not tied to a stale alias.
  if (/^[^:\s]+:\d+$/.test(device)) {
    await run(adbPath, ["connect", device], { timeout: 10000 });
  }
  await run(adbPath, ["-s", device, "get-state"], { timeout: 10000 });
}

function patchTemplates(assets, packageName) {
  const baseRoot = assets.parts[0].decodedPath;
  const indexHtmlFile = path.join(baseRoot, "assets", "www", "index.html");
  const tokenBridgeFile = path.join(
    baseRoot,
    "assets",
    "www",
    "dqueue-token-bridge.js"
  );
  const manifestFiles = assets.parts.map((part) => path.join(part.decodedPath, "AndroidManifest.xml"));
  assertFiles([indexHtmlFile, ...manifestFiles]);

  const files = new Set();
  for (const part of assets.parts) {
    assertFiles([part.decodedPath]);
    for (const file of listTemplateTextFiles(part.decodedPath)) files.add(file);
  }
  files.add(indexHtmlFile);

  const originals = new Map();
  for (const file of files) originals.set(file, fs.readFileSync(file, "utf8"));

  const originalIndex = originals.get(indexHtmlFile);
  if (!originalIndex.includes("</body>")) {
    throw new Error(`Cannot inject clone login script: missing </body> in ${indexHtmlFile}`);
  }

  for (const [file, original] of originals) {
    let modified = replacePackageReferences(original, assets.sourcePackage, packageName);
    if (path.basename(file) === "AndroidManifest.xml") {
      modified = restoreSourceComponentClasses(modified, assets.sourcePackage, packageName);
    }
    if (file === indexHtmlFile) {
      modified = modified.replace("</body>", `${createInjectionScript(packageName)}</body>`);
    }
    if (modified !== original) fs.writeFileSync(file, modified, "utf8");
  }
  fs.writeFileSync(tokenBridgeFile, createTokenBridgeScript(packageName), "utf8");

  return () => {
    for (const [file, original] of originals) fs.writeFileSync(file, original, "utf8");
    if (fs.existsSync(tokenBridgeFile)) fs.unlinkSync(tokenBridgeFile);
  };
}

async function buildClone({ account, adbPath, device }) {
  if (!/^me\.deltaqueue\.dqueue\.account\d+$/.test(account.packageName)) {
    throw new Error("Invalid clone package name");
  }

  const assets = loadCloneAssets();
  const apktool = path.join(TOOLS_ROOT, "apktool_3.0.2.jar");
  const signer = path.join(TOOLS_ROOT, "uber-apk-signer-1.3.0.jar");
  const zipalign = path.join(TOOLS_ROOT, "zipalign.exe");
  assertFiles([...assets.parts.map((part) => part.decodedPath), apktool, signer]);

  const outputRoot = path.join(
    GENERATED_ROOT,
    `account-${account.id}`,
    `build-${Date.now()}`
  );
  const signedRoot = path.join(outputRoot, "signed");
  fs.mkdirSync(signedRoot, { recursive: true });
  const unsignedApks = assets.parts.map((part) => path.join(outputRoot, part.file));

  sanitizeTemplateForApktool(assets);
  const restoreTemplates = patchTemplates(assets, account.packageName);
  try {
    for (let index = 0; index < assets.parts.length; index += 1) {
      await run(JAVA_PATH, [
        "-jar",
        apktool,
        "b",
        assets.parts[index].decodedPath,
        "-o",
        unsignedApks[index],
        "-f",
      ]);
    }
  } finally {
    restoreTemplates();
  }

  const signerArgs = ["-jar", signer, "--apks", ...unsignedApks, "--out", signedRoot];
  if (fs.existsSync(zipalign)) {
    signerArgs.push("--zipAlignPath", zipalign);
  } else {
    signerArgs.push("--skipZipAlign");
  }
  await run(JAVA_PATH, signerArgs);

  const signedApks = fs
    .readdirSync(signedRoot)
    .filter((name) => name.endsWith("-debugSigned.apk"))
    .sort()
    .map((name) => path.join(signedRoot, name));
  if (signedApks.length !== assets.parts.length) {
    throw new Error("APK signing did not produce every required split APK");
  }

  await ensureInstallTarget(adbPath, device);
  await run(adbPath, ["-s", device, "install-multiple", "-r", ...signedApks], {
    timeout: 60000,
  });
  await run(adbPath, [
    "-s",
    device,
    "shell",
    "pm",
    "grant",
    account.packageName,
    "android.permission.ACCESS_COARSE_LOCATION",
  ]).catch(() => {});
  await run(adbPath, [
    "-s",
    device,
    "shell",
    "pm",
    "grant",
    account.packageName,
    "android.permission.ACCESS_FINE_LOCATION",
  ]).catch(() => {});

  return { outputRoot, signedApks };
}

module.exports = {
  buildClone,
  createTokenBridgeScript,
  restoreSourceComponentClasses,
};
