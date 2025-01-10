import fs from "node:fs/promises";

import { Notification } from "electron";

import Notifications from "./Notifications";

export default class Scheduler {
  constructor() {
    this.checkScavenge();
    this.checkNotifications();
    if (!this.scheduleMinutes) {
      this.scheduleSeconds = setInterval(() => {
        this.checkSeconds();
      }, 1000);
    }
  }

  checkSeconds() {
    if (this.scheduleMinutes) {
      clearInterval(this.scheduleSeconds);
    }
    const d = new Date();
    
    if (d.getSeconds() % 10 == 0) {
      clearInterval(this.scheduleSeconds);
      this.scheduleMinutes = setInterval(() => {
        this.checkMinutes();
      }, 1000 * 60);
    }
  }

  checkMinutes() {
    this.checkScavenge();
    this.checkNotifications();
  }

  async checkScavenge() {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += "/forge_first" + "/scavenges.json";
      const data = await fs.readFile(url, { encoding: "utf8" });
      const scanvenges = JSON.parse(data);
      const d = new Date();
      for (let i = 0; i < scanvenges.length; i++) {
        if (d >= scanvenges[i].time) {
          new Notification({
            title: this.scanvenges[i].title + " has finished",
            body: this.notifications[i].time,
          }).show();
        }
      }
    } catch (err) {}
  }

  async checkNotifications() {
    const notifications = Notifications.getNotifications();
    const d = new Date();

    for (let i = 0; i < notifications.length; i++) {
        if (d >= notifications[i].time) {
          new Notification({
            title: this.notifications[i].title,
            body: this.notifications[i].time,
          }).show();

          
          Notifications.deleteNotification(notifications[i].id)
          
        }
      }

  }
}
