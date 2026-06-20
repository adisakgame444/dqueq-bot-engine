import fs from "fs";
import path from "path";

export function dataFile(name: string): string {
  const dataDir = process.env.DQUEUE_DATA_DIR?.trim();
  if (dataDir) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir ? path.join(dataDir, name) : name;
}
