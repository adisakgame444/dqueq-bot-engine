import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const entryPoint = fileURLToPath(
  new URL("./client/stream-client-source.js", import.meta.url)
);
const outfile = fileURLToPath(
  new URL("./client/stream-client.js", import.meta.url)
);

await build({
  entryPoints: [entryPoint],
  outfile,
  bundle: true,
  minify: true,
  platform: "browser",
  target: "chrome110",
});
