import fs from "node:fs/promises";
import { ipcMain } from "electron";
import genericUtils from "../utils/genericUtils";

export default class Scavenges {
  constructor() {
    this.setUpHandlers();
  }

  setUpHandlers() {
    ipcMain.handle("postNotification", (event, data) =>
      this.postNotification(data)
    );
    ipcMain.handle("putNotification", (event, id, data) =>
      this.putNotification(id, data)
    );
    ipcMain.handle("deleteNotification", (event, id) =>
      this.deleteNotification(id)
    );
    ipcMain.handle("getNotificationsForQuest", (event, id) =>
      this.getNotificationsForQuest(id)
    );
  }

  static async getScavenges() {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/scavenges.json`;
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

  static async deleteScavenge(id) {
    let scavenges = await this.getScavenges();

    let i = 0;
    let found = false;
    while (i < scavenges.length && found == false) {
      if (scavenges[i].id == id) {
        found = true;
        scavenges.splice(i, 1);

        let url =
          process.env.APPDATA ||
          (process.platform == "darwin"
            ? process.env.HOME + "/Library/Preferences"
            : process.env.HOME + "/.local/share");
        url += `/helldivers_ticketing/scavenges.json`;
        let result = true;
        await fs.writeFile(url, JSON.stringify(scavenges), (err) => {
          if (err) {
            result = false;
          }
        });
      }
      i++;
    }
  }

  static async postScavenge(data) {
    let scavenges = await this.getScavenges();
    let rawData = JSON.parse(data);

    let newScavenge = {
      id: genericUtils.createId,
      place: rawData.place,
      time: "",
    };
    scavenges.push(newScavenge);

    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += `/helldivers_ticketing/scavenges.json`;
    let result = true;
    await fs.writeFile(url, JSON.stringify(scavenges), (err) => {
      if (err) {
        result = false;
      }
    });

    return result;
  }
}
