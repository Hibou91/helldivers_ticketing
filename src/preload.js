// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("questUtils", {
  getAllQuests: (category) => ipcRenderer.invoke("getAllQuests", category),
  postQuest: (category, data) =>
    ipcRenderer.invoke("postQuest", category, data),
  putQuest: (category, data) => ipcRenderer.invoke("putQuest", category, data),
  deleteQuest: (category, data) => ipcRenderer.invoke("deleteQuest", category, data),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("generic", {
  getCastleData:() => ipcRenderer.invoke("getCastleData"),
  quitProgram: () => ipcRenderer.invoke("quitProgram"),
});
