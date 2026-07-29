const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const CLONE_ROOT = path.join(PROJECT_ROOT, "scratch", "dqueue-clone");
const CONFIG_FILE = path.join(CLONE_ROOT, "clone-config.json");

function assertSafeName(value, field) {
  if (typeof value !== "string" || !/^[A-Za-z0-9._-]+$/.test(value)) {
    throw new Error(`Invalid ${field} in clone-config.json`);
  }
  return value;
}

function validateCloneConfig(value) {
  if (!value || typeof value !== "object") {
    throw new Error("clone-config.json must contain an object");
  }
  if (value.sourcePackage !== "me.deltaqueue.dqueue") {
    throw new Error("clone-config.json has an unsupported source package");
  }

  const rawParts = [value.base, ...(Array.isArray(value.splits) ? value.splits : [])];
  if (!value.base || rawParts.length < 2) {
    throw new Error("clone-config.json must define a base APK and at least one split APK");
  }

  const seenFiles = new Set();
  const parts = rawParts.map((part, index) => {
    if (!part || typeof part !== "object") {
      throw new Error("clone-config.json contains an invalid APK part");
    }
    const file = assertSafeName(part.file, "APK file name");
    const decodedDir = assertSafeName(part.decodedDir, "decoded directory");
    if (seenFiles.has(file)) {
      throw new Error("clone-config.json contains duplicate APK file names");
    }
    seenFiles.add(file);
    return {
      id: index === 0 ? "base" : assertSafeName(part.id, "split ID"),
      file,
      decodedDir,
      base: index === 0,
    };
  });

  if (!parts[0].base || parts[0].file !== "base.apk") {
    throw new Error("clone-config.json must use base.apk for the base APK");
  }

  return { sourcePackage: value.sourcePackage, parts };
}

function loadCloneAssets() {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error(
      `Clone assets are not prepared. Missing ${CONFIG_FILE}. Run npm run clone:prepare first.`
    );
  }
  const config = validateCloneConfig(JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")));
  return {
    ...config,
    cloneRoot: CLONE_ROOT,
    originalDir: path.join(CLONE_ROOT, "original"),
    parts: config.parts.map((part) => ({
      ...part,
      originalPath: path.join(CLONE_ROOT, "original", part.file),
      decodedPath: path.join(CLONE_ROOT, part.decodedDir),
    })),
  };
}

function originalApkPaths() {
  return loadCloneAssets().parts.map((part) => part.originalPath);
}

module.exports = {
  CLONE_ROOT,
  CONFIG_FILE,
  PROJECT_ROOT,
  loadCloneAssets,
  originalApkPaths,
  validateCloneConfig,
};
