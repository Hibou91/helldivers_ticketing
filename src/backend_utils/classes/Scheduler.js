import fs from "node:fs/promises";

import { Notification } from "electron";

import Notifications from "./Notifications";
import Scavenges from "./Scavenges";

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
    const scanvenges = await Scavenges.getScavenges();
    const d = new Date();
    for (let i = 0; i < scanvenges.length; i++) {
      if (scanvenges[i].state != "ACTIVE") {
        continue;
      }
      const dValue = new Date(scanvenges[i].time);
      if (d >= dValue) {
        const finished = await Scavenges.finishScavenge(scanvenges[i].id);
        new Notification({
          title: `${finished.targetName} quest in the ${ finished.typeName }`,
          body: ` has finished with ${finished.success == true ? "success" : "faliure"}!`,
        }).show();
      }
    }
  }

  async checkNotifications() {
    const notifications = await Notifications.getNotifications();
    const d = new Date();

    for (let i = 0; i < notifications.length; i++) {
      if (d >= notifications[i].time) {
        new Notification({
          title: this.notifications[i].title,
          body: this.notifications[i].time,
        }).show();

        Notifications.deleteNotification(notifications[i].id);
      }
    }
  }
}
