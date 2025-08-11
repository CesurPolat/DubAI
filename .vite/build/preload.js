"use strict";
const electron = require("electron");
const APIs = {
  // Installation Service Listeners
  SelectDirectory: () => electron.ipcRenderer.invoke("selectVideosDirectory"),
  SetGPTToken: (token) => electron.ipcRenderer.invoke("setGPTToken", token),
  SetupChecker: () => electron.ipcRenderer.invoke("setupChecker")
};
electron.contextBridge.exposeInMainWorld("API", APIs);
window.addEventListener("mouseup", (e) => {
  if (e.button === 3 || e.button === 4)
    e.preventDefault();
});
