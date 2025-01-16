// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("questUtils", {
  getAllQuests: (category) => ipcRenderer.invoke("getAllQuests", category),
  getQuestById: (category, id) => ipcRenderer.invoke("getQuestById", category, id),
  postQuest: (category, data) =>
    ipcRenderer.invoke("postQuest", category, data),
  putQuest: (category, data) => ipcRenderer.invoke("putQuest", category, data),
  deleteQuest: (category, data) => ipcRenderer.invoke("deleteQuest", category, data),
  postNotification: (questid, data) => ipcRenderer.invoke("postNotification",questid, data),
  putNotification: (id, data) => ipcRenderer.invoke("putNotification", id, data),
  deleteNotification: (id) => ipcRenderer.invoke("deleteNotification", id),
  getNotificationsForQuest: (id) => ipcRenderer.invoke("getNotificationsForQuest", id),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("keeperUtils", {
  postScavenge:() => ipcRenderer.invoke("postScavenge", id),
  deleteScavenge:(id) => ipcRenderer.invoke("deleteScavenge", id),
  generateScavenges:(category) => ipcRenderer.invoke("generateScavenges", category),
});

contextBridge.exposeInMainWorld("generic", {
  getCastleData:() => ipcRenderer.invoke("getCastleData"),
  getLocaleData:() => ipcRenderer.invoke("getLocaleData", category),
  getLocaleKeeperData:(category) => ipcRenderer.invoke("getLocaleKeeperData", category),
  quitProgram: () => ipcRenderer.invoke("quitProgram"),
});
