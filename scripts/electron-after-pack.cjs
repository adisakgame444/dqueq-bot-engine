const fs = require("fs");
const path = require("path");

function copyDirectory(source, target) {
  if (!fs.existsSync(source)) {
    throw new Error(`Missing required package folder: ${source}`);
  }

  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

exports.default = async function afterPack(context) {
  const projectRoot = context.packager.projectDir;
  const appRoot = path.join(context.appOutDir, "resources", "app");

  const requiredPackages = [
    ["typescript"],
    ["@types", "node"],
    ["@types", "react"],
    ["@types", "react-dom"],
  ];

  for (const parts of requiredPackages) {
    const source = path.join(projectRoot, "node_modules", ...parts);
    const target = path.join(appRoot, "node_modules", ...parts);
    copyDirectory(source, target);
  }
};
