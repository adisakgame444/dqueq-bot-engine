const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { CLONE_ROOT, PROJECT_ROOT } = require("./clone-assets.cjs");

const sourceXapk = process.argv[2];
const BUNDLED_JAVA = process.env.DQUEUE_JRE_PATH
  ? path.join(process.env.DQUEUE_JRE_PATH, "bin", "java.exe")
  : path.join(PROJECT_ROOT, "launcher-assets", "jre", "bin", "java.exe");
const JAVA_PATH = fs.existsSync(BUNDLED_JAVA) ? BUNDLED_JAVA : "java";
const APKTOOL = path.join(PROJECT_ROOT, "scratch", "tools", "apktool_3.0.2.jar");

function fail(message) {
  console.error(`DQueue clone preparation failed: ${message}`);
  process.exitCode = 1;
}

function safeSplitId(id) {
  if (typeof id !== "string" || !/^config\.[A-Za-z0-9._-]+$/.test(id)) {
    throw new Error(`Unsupported split ID: ${id}`);
  }
  return id;
}

function run(file, args) {
  execFileSync(file, args, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
    windowsHide: true,
  });
}

try {
  if (!sourceXapk) {
    throw new Error("Usage: npm run clone:prepare -- <path-to-dqueue.xapk>");
  }
  const sourcePath = path.resolve(sourceXapk);
  if (!fs.existsSync(sourcePath) || path.extname(sourcePath).toLowerCase() !== ".xapk") {
    throw new Error("The source must be an existing .xapk file");
  }
  if (fs.existsSync(CLONE_ROOT)) {
    throw new Error(`${CLONE_ROOT} already exists. It was not changed to preserve existing clone assets.`);
  }
  if (!fs.existsSync(APKTOOL)) {
    throw new Error(`Missing ${APKTOOL}`);
  }

  const unpackDir = path.join(PROJECT_ROOT, "scratch", `.xapk-unpack-${Date.now()}`);
  fs.mkdirSync(unpackDir, { recursive: true });
  try {
    run("tar.exe", ["-xf", sourcePath, "-C", unpackDir]);
    const manifestPath = path.join(unpackDir, "manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.package_name !== "me.deltaqueue.dqueue") {
      throw new Error(`Expected me.deltaqueue.dqueue, received ${manifest.package_name || "unknown"}`);
    }
    if (!Array.isArray(manifest.split_apks) || manifest.split_apks.length < 2) {
      throw new Error("The XAPK does not contain the required split APK list");
    }

    const base = manifest.split_apks.find((part) => part.id === "base");
    if (!base || typeof base.file !== "string") {
      throw new Error("The XAPK does not contain a base APK");
    }
    const splits = manifest.split_apks
      .filter((part) => part.id !== "base")
      .map((part) => ({ id: safeSplitId(part.id), file: part.file }));

    fs.mkdirSync(path.join(CLONE_ROOT, "original"), { recursive: true });
    const parts = [
      { id: "base", sourceFile: base.file, file: "base.apk", decodedDir: "decoded-base" },
      ...splits.map((part) => ({
        id: part.id,
        sourceFile: part.file,
        file: `split_${part.id}.apk`,
        decodedDir: `decoded-${part.id}`,
      })),
    ];

    for (const part of parts) {
      const sourceApk = path.join(unpackDir, part.sourceFile);
      if (!fs.existsSync(sourceApk)) {
        throw new Error(`The XAPK is missing ${part.sourceFile}`);
      }
      fs.copyFileSync(sourceApk, path.join(CLONE_ROOT, "original", part.file));
      run(JAVA_PATH, [
        "-jar",
        APKTOOL,
        "d",
        path.join(CLONE_ROOT, "original", part.file),
        "-o",
        path.join(CLONE_ROOT, part.decodedDir),
        "-f",
      ]);
    }

    const config = {
      sourcePackage: "me.deltaqueue.dqueue",
      appVersion: String(manifest.version_name || "unknown"),
      base: { file: "base.apk", decodedDir: "decoded-base" },
      splits: parts.slice(1).map(({ id, file, decodedDir }) => ({ id, file, decodedDir })),
    };
    fs.writeFileSync(
      path.join(CLONE_ROOT, "clone-config.json"),
      `${JSON.stringify(config, null, 2)}\n`,
      "utf8"
    );
    console.log(`Prepared DQueue ${config.appVersion} clone assets in ${CLONE_ROOT}`);
  } finally {
    fs.rmSync(unpackDir, { recursive: true, force: true });
  }
} catch (error) {
  fail(error.message);
}
