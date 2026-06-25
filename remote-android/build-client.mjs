import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const entryPoint = fileURLToPath(
  new URL("./client/stream-client-source.js", import.meta.url)
);
const outfile = fileURLToPath(
  new URL("./client/stream-client.js", import.meta.url)
);
const publicOutfile = fileURLToPath(
  new URL("../public/remote/stream-client.js", import.meta.url)
);

await build({
  entryPoints: [entryPoint],
  outfile,
  bundle: true,
  minify: true,
  platform: "browser",
  target: "chrome110",
});

// Copy output to public directory for Next.js (Vercel)
fs.copyFileSync(outfile, publicOutfile);
console.log("Successfully compiled and copied client script!");

