const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(rootDir, ".env");
const outPath = path.join(rootDir, "dqueue-config.enc");
const password = process.argv[2] || process.env.DQUEUE_CONFIG_PASSWORD || "";

if (!password || password.length < 10) {
  console.error("Usage: node scripts/encrypt-env.cjs <unlock-password-10-chars-min>");
  process.exit(1);
}

const plaintext = fs.readFileSync(envPath, "utf8");
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(password, salt, 210000, 32, "sha256");
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([
  cipher.update(plaintext, "utf8"),
  cipher.final(),
]);
const tag = cipher.getAuthTag();

const payload = {
  version: 1,
  kdf: "pbkdf2-sha256",
  iterations: 210000,
  cipher: "aes-256-gcm",
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  tag: tag.toString("base64"),
  data: encrypted.toString("base64"),
};

fs.writeFileSync(outPath, `${JSON.stringify(payload)}\n`);
console.log(`Encrypted ${envPath} -> ${outPath}`);
