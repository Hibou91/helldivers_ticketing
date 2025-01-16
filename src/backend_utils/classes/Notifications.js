
import { ipcMain } from "electron";
import genericUtils from "../utils/genericUtils";
import fileUtil from "../utils/fileUtil";

export default class Notifications {
  constructor() {
    this.setUpHandlers();
  }

  setUpHandlers() {
    ipcMain.handle("postNotification", (event, questId, data) =>
      Notifications.postNotification(questId, data)
    );
    ipcMain.handle("putNotification", (event, id, data) =>
      Notifications.putNotification(id, data)
    );
    ipcMain.handle("deleteNotification", (event, id) =>
      Notifications.deleteNotification(id)
    );
    ipcMain.handle("getNotificationsForQuest", (event, id) =>
      Notifications.getNotificationsForQuest(id)
    );
  }

  static async getNotifications() {
    const notifications = await fileUtil.getFileData('notifications.json')
    if(notifications == false){
      return []
    }else{
      return notifications
    }
  }

  static async deleteNotification(id) {
    let notifications = await this.getNotifications();

    let i = 0;
    let found = false;
    while (i < notifications.length && found == false) {
      if (notifications[i].id == id) {
        found = true;
        notifications.splice(i, 1);
      }
      i++;
    }

    return await fileUtil.postFileData('notifications.json', notifications)

  }

  static async deleteQuestNotifications(id) {
    let notifications = await this.getNotifications();

    let i = 0;
   
    while (i < notifications.length ) {
      if (notifications[i].questId == id) {
        
        notifications.splice(i, 1);
        i--;
      }
      i++;
    }

    return await fileUtil.postFileData('notifications.json', notifications)
  }

  static async putNotification(id, data) {
    let notifications = await this.getNotifications();
    const rawData = JSON.parse(data)

    let i = 0;
    let found = false;
    while (i < notifications.length && found == false) {
      if (notifications[i].id == id) {
        found = true;

        notifications[i].title = rawData.title;
        notifications[i].body = rawData.body;
        notifications[i].time = rawData.time;

        
      }
      i++;
    }

    return await fileUtil.postFileData('notifications.json', notifications)
  }

  static async postNotification(questId, data) {
    let notifications = await this.getNotifications();

    let rawData = JSON.parse(data);
    const newNotification = {
      id: genericUtils.createId(notifications),
      title: rawData.title,
      body: rawData.body,
      time: rawData.time,
      questId: questId,
    };

    notifications.push(newNotification);

    const result = await fileUtil.postFileData('notifications.json', notifications)
    console.log(result);
    
    if(result == true){
      return newNotification;
    }else{
      return result
    }

    
  }

  static async getNotificationsForQuest(questId) {
    const notifications = await this.getNotifications();
    const returnValue = [];

    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].questId == questId) {
        returnValue.push(notifications[i]);
      }
    }

    return returnValue;
  }
}
