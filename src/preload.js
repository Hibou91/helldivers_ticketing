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
  getQuestConfig:() => ipcRenderer.invoke("getQuestConfig"),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("keeperUtils", {
  postScavenge:(id) => ipcRenderer.invoke("postScavenge", id),
  deleteScavenge:(id) => ipcRenderer.invoke("deleteScavenge", id),
  generateScavenges:(category) => ipcRenderer.invoke("generateScavenges", category),
  claimScavenge:(id) => ipcRenderer.invoke("claimScavenge", id),
  onUpdateCounter: (category) => ipcRenderer.on('update-scavenge', category)
});

contextBridge.exposeInMainWorld("localeUtils", {
  getQuestCategoryData:(category) => ipcRenderer.invoke("getQuestCategoryData", category),
  postQuestCategoryData:(category, data) => ipcRenderer.invoke("postQuestCategoryData", category, data),
  putQuestCategoryData:(category, id, data) => ipcRenderer.invoke("putQuestCategoryData", category, id, data),
  deleteQuestCategoryData:(category, id) => ipcRenderer.invoke("deleteQuestCategoryData", category,  id),
  levelKeeper:(category, skill, upOrDown) => ipcRenderer.invoke("levelKeeper", category, skill, upOrDown),
  
});

contextBridge.exposeInMainWorld("generic", {
  getCastleData:() => ipcRenderer.invoke("getCastleData"),
  getCastleConfig:() => ipcRenderer.invoke("getCastleConfig"),
  getLocaleData:(category) => ipcRenderer.invoke("getLocaleData", category),
  getLocaleKeeperData:(category) => ipcRenderer.invoke("getLocaleKeeperData", category),
  quitProgram: () => ipcRenderer.invoke("quitProgram"),
});
