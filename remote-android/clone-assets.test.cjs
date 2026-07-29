const test = require("node:test");
const assert = require("node:assert/strict");
const { validateCloneConfig } = require("./clone-assets.cjs");
const {
  createTokenBridgeScript,
  restoreSourceComponentClasses,
} = require("./clone-builder.cjs");
const fs = require("fs");
const path = require("path");

test("accepts the current DQueue base, language, and density split layout", () => {
  const assets = validateCloneConfig({
    sourcePackage: "me.deltaqueue.dqueue",
    base: { file: "base.apk", decodedDir: "decoded-base" },
    splits: [
      { id: "config.en", file: "split_config.en.apk", decodedDir: "decoded-config.en" },
      { id: "config.mdpi", file: "split_config.mdpi.apk", decodedDir: "decoded-config.mdpi" },
    ],
  });
  assert.deepEqual(
    assets.parts.map((part) => part.file),
    ["base.apk", "split_config.en.apk", "split_config.mdpi.apk"]
  );
});

test("rejects unsafe clone asset paths", () => {
  assert.throws(
    () =>
      validateCloneConfig({
        sourcePackage: "me.deltaqueue.dqueue",
        base: { file: "../base.apk", decodedDir: "decoded-base" },
        splits: [{ id: "config.en", file: "split_config.en.apk", decodedDir: "decoded-config.en" }],
      }),
    /Invalid APK file name/
  );
});

test("clone builder falls back safely when zipalign is not bundled", () => {
  const builder = fs.readFileSync(path.join(__dirname, "clone-builder.cjs"), "utf8");
  assert.match(builder, /--skipZipAlign/);
  assert.match(builder, /endsWith\("-debugSigned\.apk"\)/);
  assert.match(builder, /\["connect", device\]/);
  assert.match(builder, /dqueue-token-bridge\.js/);
  assert.doesNotMatch(builder, /if \(!localStorage\.getItem\("jwtToken"\)\)/);
  assert.match(builder, /timeout: 10000/);
});

test("clone token bridge waits for the page and stores the web login token", () => {
  const bridge = createTokenBridgeScript("me.deltaqueue.dqueue.account3");
  assert.match(bridge, /DOMContentLoaded/);
  assert.match(bridge, /XMLHttpRequest/);
  assert.match(bridge, /http:\/\/localhost:5100/);
  assert.match(bridge, /localStorage\.setItem\("jwtToken"/);
  assert.match(bridge, /window\.setTimeout\(requestToken, retryDelayMs\)/);
  assert.match(bridge, /retryDelayMs = 2000/);
  assert.match(bridge, /me\.deltaqueue\.dqueue\.account3/);
});

test("Android agent restores the localhost reverse tunnel after device warmup", () => {
  const server = fs.readFileSync(path.join(__dirname, "server.cjs"), "utf8");
  assert.match(server, /reverse", "tcp:5100", "tcp:5100/);
  assert.match(server, /await ensureAgentPortReverse\(\)/);
});

test("clone manifests keep Android component classes in the source code namespace", () => {
  const sourcePackage = "me.deltaqueue.dqueue";
  const clonePackage = "me.deltaqueue.dqueue.account2";
  const manifest = `<activity android:name="${clonePackage}.MainActivity"/><provider android:authorities="${clonePackage}.files" android:name="androidx.core.content.FileProvider"/>`;
  const fixed = restoreSourceComponentClasses(manifest, sourcePackage, clonePackage);
  assert.match(fixed, /android:name="me\.deltaqueue\.dqueue\.MainActivity"/);
  assert.match(fixed, /android:authorities="me\.deltaqueue\.dqueue\.account2\.files"/);
});
