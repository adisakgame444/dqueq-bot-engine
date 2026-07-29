import fs from "fs";
import { dataFile } from "./data_dir";

const FILE_PATH = dataFile("active_agent_tunnel.json");

interface ActiveAgentTunnelInfo {
  url: string;
  updatedAt: string;
}

export function getActiveAgentTunnel(): ActiveAgentTunnelInfo {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
      if (data && data.url) {
        return {
          url: String(data.url).trim(),
          updatedAt: data.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.error("Failed to read active agent tunnel file:", e);
  }
  return {
    url: "",
    updatedAt: new Date().toISOString(),
  };
}

export function saveActiveAgentTunnel(url: string): ActiveAgentTunnelInfo {
  const info: ActiveAgentTunnelInfo = {
    url: String(url || "").trim(),
    updatedAt: new Date().toISOString(),
  };
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(info, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to write active agent tunnel file:", e);
  }
  return info;
}
