"use strict";
const electron = require("electron");
const AllAPIs = {
  // Installation Service Listeners
  SelectDirectory: () => electron.ipcRenderer.invoke("selectVideosDirectory"),
  SetGPTToken: (token) => electron.ipcRenderer.invoke("setGPTToken", token),
  SetupChecker: () => electron.ipcRenderer.invoke("setupChecker")
};
electron.contextBridge.exposeInMainWorld("API", AllAPIs);
