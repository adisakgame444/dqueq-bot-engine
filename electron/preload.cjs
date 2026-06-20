const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("launcher", {
  startAll: () => ipcRenderer.invoke("start-all"),
  stopAll: () => ipcRenderer.invoke("stop-all"),
  openWeb: () => ipcRenderer.invoke("open-web"),
  openAccounts: () => ipcRenderer.invoke("open-accounts"),
  unlockConfig: (password) => ipcRenderer.invoke("unlock-config", password),
  status: () => ipcRenderer.invoke("status"),
  onStatus: (callback) => ipcRenderer.on("status", (_event, value) => callback(value)),
  onConfigStatus: (callback) => ipcRenderer.on("config-status", (_event, value) => callback(value)),
  onLog: (callback) => ipcRenderer.on("log", (_event, value) => callback(value)),
});
