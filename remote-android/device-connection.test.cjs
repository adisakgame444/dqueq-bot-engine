const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  candidatePorts,
  isSupportedAndroidVersion,
  normalizeDeviceConfig,
  shouldRediscoverDevice,
} = require("./device-connection.cjs");

test("portable installs auto-detect BlueStacks when ANDROID_DEVICE is omitted or auto", () => {
  assert.equal(normalizeDeviceConfig(undefined).hasPinnedDevice, false);
  assert.equal(normalizeDeviceConfig("auto").hasPinnedDevice, false);
  assert.deepEqual(normalizeDeviceConfig("127.0.0.1:5565"), {
    configuredDevice: "127.0.0.1:5565",
    hasPinnedDevice: true,
    initialDevice: "127.0.0.1:5565",
  });
});

test("candidate ports preserve config priority and remove invalid duplicates", () => {
  assert.deepEqual(candidatePorts([5565, 5555, 5565, -1, 70000], [5555, 5556]), [5565, 5555, 5556]);
});

test("Android 11 variants are accepted", () => {
  assert.equal(isSupportedAndroidVersion("11.0.0"), true);
  assert.equal(isSupportedAndroidVersion("12"), false);
});

test("auto mode re-discovers after ADB loss while a pinned device reconnects in place", () => {
  assert.equal(shouldRediscoverDevice({ hasPinnedDevice: false, isAndroidServiceError: false }), true);
  assert.equal(shouldRediscoverDevice({ hasPinnedDevice: true, isAndroidServiceError: false }), false);
  assert.equal(shouldRediscoverDevice({ hasPinnedDevice: true, isAndroidServiceError: true }), true);
});

test("startup policy probes ports concurrently, warms up ADB, and defers scrcpy sessions", () => {
  const serverSource = fs.readFileSync(path.join(__dirname, "server.cjs"), "utf8");
  const relaySource = fs.readFileSync(path.join(__dirname, "multi-scrcpy-relay.mjs"), "utf8");
  assert.match(serverSource, /await Promise\.allSettled\(/);
  assert.match(serverSource, /scheduleDeviceWarmup\(\);/);
  assert.doesNotMatch(relaySource, /for \(const account of accounts\) \{\s*if \(account\.enabled !== false\) ensureSession\(account\);\s*\}/);
});
