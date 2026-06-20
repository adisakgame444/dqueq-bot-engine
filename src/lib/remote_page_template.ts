import fs from "node:fs";
import path from "node:path";

const STREAM_CLIENT_VERSION = "115";

export function getAgentOrigin() {
  return (
    process.env.NEXT_PUBLIC_REMOTE_AGENT_URL ||
    process.env.REMOTE_AGENT_URL ||
    "https://remote.bothero.online"
  ).replace(/\/+$/, "");
}

export function renderRemotePage(templateName: "app-ios.html" | "app-only.html", accountId: string) {
  const templatePath = path.join(
    process.cwd(),
    "remote-android",
    "client",
    templateName
  );
  const accountName = `Account ${accountId}`;
  const agentOrigin = getAgentOrigin();
  const agentScript = `<script>window.__DQUEUE_AGENT_URL__=${JSON.stringify(agentOrigin)};</script>`;

  return fs
    .readFileSync(templatePath, "utf8")
    .replaceAll("__ACCOUNT_NAME__", accountName)
    .replace(
      '<link rel="manifest" href="/manifest.json" />',
      `<link rel="manifest" href="/manifest.json?view=${templateName === "app-ios.html" ? "app-ios" : "app"}&amp;id=${accountId}&amp;v=${STREAM_CLIENT_VERSION}" />`
    )
    .replace(
      /<script src="\/stream-client\.js(?:\?v=\d+)?" defer><\/script>/,
      `${agentScript}\n  <script src="/remote/stream-client.js?v=${STREAM_CLIENT_VERSION}" defer></script>`
    );
}

