import fs from "node:fs/promises";
import { ipcMain } from "electron";
import genericUtils from "../utils/genericUtils";

export default class Notifications {
  constructor() {
    this.setUpHandlers();
  }

  setUpHandlers() {
    ipcMain.handle("postNotification", (event, questId, data) =>
      Notifications.postNotification(questId, data)
    );
    ipcMain.handle("putNotification", (event, id, data) =>
      this.putNotification(id, data)
    );
    ipcMain.handle("deleteNotification", (event, id) =>
      Notifications.deleteNotification(id)
    );
    ipcMain.handle("getNotificationsForQuest", (event, id) =>
      Notifications.getNotificationsForQuest(id)
    );
  }

  static async getNotifications() {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/notifications.json`;
      let data = await fs.readFile(url, { encoding: "utf8" });
      data = JSON.parse(data);

      if (!data || data == "") {
        return [];
      }

      return data;
    } catch (err) {
      return [];
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

        let url =
          process.env.APPDATA ||
          (process.platform == "darwin"
            ? process.env.HOME + "/Library/Preferences"
            : process.env.HOME + "/.local/share");
        url += `/helldivers_ticketing/notifications.json`;
        let result = true;
        await fs.writeFile(url, JSON.stringify(notifications), (err) => {
          if (err) {
            result = false;
          }
        });
      }
      i++;
    }
  }

  static async putNotification(id, data) {
    let notifications = await this.getNotifications();

    let i = 0;
    let found = false;
    while (i < notifications.length && found == false) {
      if (notifications[i].id == id) {
        found = true;

        notifications[i].title = data.title;
        notifications[i].body = data.body;
        notifications[i].time = data.time;

        let url =
          process.env.APPDATA ||
          (process.platform == "darwin"
            ? process.env.HOME + "/Library/Preferences"
            : process.env.HOME + "/.local/share");
        url += `/helldivers_ticketing/notifications.json`;
        let result = true;
        await fs.writeFile(url, JSON.stringify(notifications), (err) => {
          if (err) {
            result = false;
          }
        });
      }
      i++;
    }
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

    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += `/helldivers_ticketing/notifications.json`;
    let result = true;
    await fs.writeFile(url, JSON.stringify(notifications), (err) => {
      if (err) {
        result = false;
      }
    });

    return newNotification;
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
