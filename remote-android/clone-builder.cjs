const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const BUNDLED_JAVA = process.env.DQUEUE_JRE_PATH
  ? path.join(process.env.DQUEUE_JRE_PATH, "bin", "java.exe")
  : path.join(PROJECT_ROOT, "launcher-assets", "jre", "bin", "java.exe");
const JAVA_PATH = fs.existsSync(BUNDLED_JAVA) ? BUNDLED_JAVA : "java";
const TEMPLATE_ROOT = path.join(
  PROJECT_ROOT,
  "scratch",
  "dqueue-clone"
);
const TOOLS_ROOT = path.join(PROJECT_ROOT, "scratch", "tools");
const GENERATED_ROOT = process.env.DQUEUE_DATA_DIR
  ? path.join(process.env.DQUEUE_DATA_DIR, "remote-android", "generated", "accounts")
  : path.join(__dirname, "generated", "accounts");
const TEMPLATE_PACKAGE = "me.deltaqueue.dqueue.account2";

const TEMPLATE_FILES = [
  path.join(TEMPLATE_ROOT, "decoded-base", "AndroidManifest.xml"),
  path.join(TEMPLATE_ROOT, "decoded-base", "res", "xml", "config.xml"),
  path.join(
    TEMPLATE_ROOT,
    "decoded-base",
    "smali_classes2",
    "me",
    "deltaqueue",
    "dqueue",
    "BuildConfig.smali"
  ),
  path.join(TEMPLATE_ROOT, "decoded-hdpi", "AndroidManifest.xml"),
  path.join(TEMPLATE_ROOT, "decoded-th", "AndroidManifest.xml"),
];
const APKTOOL_INCOMPATIBLE_LINES = [
  /<item\s+name="android:windowOptOutEdgeToEdgeEnforcement">.*?<\/item>\s*/g,
];

function run(file, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      file,
      args,
      {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        maxBuffer: 24 * 1024 * 1024,
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

function assertFiles(paths) {
  for (const file of paths) {
    if (!fs.existsSync(file)) throw new Error(`Required file is missing: ${file}`);
  }
}

function setTemplatePackage(packageName) {
  for (const file of TEMPLATE_FILES) {
    const source = fs.readFileSync(file, "utf8");
    const normalized = source.replace(
      /me\.deltaqueue\.dqueue\.account\d+/g,
      packageName
    );
    fs.writeFileSync(file, normalized, "utf8");
  }
}

function sanitizeTemplateForApktool() {
  const stylesFile = path.join(
    TEMPLATE_ROOT,
    "decoded-base",
    "res",
    "values",
    "styles.xml"
  );
  if (!fs.existsSync(stylesFile)) return;

  let source = fs.readFileSync(stylesFile, "utf8");
  let normalized = source;
  for (const pattern of APKTOOL_INCOMPATIBLE_LINES) {
    normalized = normalized.replace(pattern, "");
  }
  if (normalized !== source) {
    fs.writeFileSync(stylesFile, normalized, "utf8");
  }
}

async function buildClone({ account, adbPath, device }) {
  if (!/^me\.deltaqueue\.dqueue\.account\d+$/.test(account.packageName)) {
    throw new Error("Invalid clone package name");
  }

  const apktool = path.join(TOOLS_ROOT, "apktool_3.0.2.jar");
  const signer = path.join(TOOLS_ROOT, "uber-apk-signer-1.3.0.jar");
  const zipalign = path.join(TOOLS_ROOT, "zipalign.exe");
  assertFiles([...TEMPLATE_FILES, apktool, signer, zipalign]);

  const outputRoot = path.join(
    GENERATED_ROOT,
    `account-${account.id}`,
    `build-${Date.now()}`
  );
  const signedRoot = path.join(outputRoot, "signed");
  fs.mkdirSync(signedRoot, { recursive: true });

  const unsignedBase = path.join(outputRoot, "base.apk");
  const unsignedHdpi = path.join(outputRoot, "split_config.hdpi.apk");
  const unsignedThai = path.join(outputRoot, "split_config.th.apk");

  sanitizeTemplateForApktool();
  setTemplatePackage(account.packageName);
  try {
    await run(JAVA_PATH, [
      "-jar",
      apktool,
      "b",
      path.join(TEMPLATE_ROOT, "decoded-base"),
      "-o",
      unsignedBase,
      "-f",
    ]);
    await run(JAVA_PATH, [
      "-jar",
      apktool,
      "b",
      path.join(TEMPLATE_ROOT, "decoded-hdpi"),
      "-o",
      unsignedHdpi,
      "-f",
    ]);
    await run(JAVA_PATH, [
      "-jar",
      apktool,
      "b",
      path.join(TEMPLATE_ROOT, "decoded-th"),
      "-o",
      unsignedThai,
      "-f",
    ]);
  } finally {
    setTemplatePackage(TEMPLATE_PACKAGE);
  }

  await run(JAVA_PATH, [
    "-jar",
    signer,
    "--apks",
    unsignedBase,
    unsignedHdpi,
    unsignedThai,
    "--out",
    signedRoot,
    "--zipAlignPath",
    zipalign,
  ]);

  const signedApks = fs
    .readdirSync(signedRoot)
    .filter((name) => name.endsWith("-aligned-debugSigned.apk"))
    .sort()
    .map((name) => path.join(signedRoot, name));
  if (signedApks.length !== 3) {
    throw new Error("APK signing did not produce all three split APK files");
  }

  await run(adbPath, [
    "-s",
    device,
    "install-multiple",
    "-r",
    ...signedApks,
  ]);
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

module.exports = { buildClone };
