import { ipcMain } from "electron";
import { app, dialog } from "electron";
import fileUtil from "./utils/fileUtil";

import Quest from "./classes/Quest";
import Castle from "./classes/Castle";
import Notifications from "./classes/Notifications";
import Scheduler from "./classes/Scheduler";
import Scavenges from "./classes/Scavenges";

export default class Game {
  constructor() {
    this.castle = new Castle();
    this.quests = new Quest();
    this.notifications = new Notifications();
    this.scheduler = new Scheduler();
    this.scavenges = new Scavenges();

    this.fileRepo = [
      "casle",
      "scavenge",
      "notifications",
      "materialConfig",
      "locale0",
      "locale1",
      "locale2",
      "quests0",
      "quests1",
      "quests2",
    ];

    ipcMain.handle("quitProgram", () => app.quit());
    ipcMain.handle("exportData", () => this.exportData());
    ipcMain.handle("importData", () => this.importData());
  }

  async exportData() {
    const options = {
      filters: [{ name: "JSON", extensions: ["json"] }],
    };
    let file = await dialog.showSaveDialog(options);

    if (file && file.canceled == false) {
      file = encodeURI(file.filePath);

      let data = {};
      for (const f of this.fileRepo) {
        const content = await fileUtil.getFileData(`${f}.json`);
        if (content != false) {
          data[f] = content;
        }
      }

      return fileUtil.exportFileData(file, data);
    }
  }

  async importData() {
    const options = {
      filters: [{ name: "JSON", extensions: ["json"] }],
    };
    let file = await dialog.showOpenDialog(options);


    if (file && file.canceled == false) {
      file = encodeURI(file.filePaths[0]);

      let data = await fileUtil.importFileData(file);
      let result = true;
      for (const f of this.fileRepo) {
        if (data[f]) {
          if (fileUtil.postFileData(`${f}.json`, data[f]) == false) {
            result = false;
          }
        }
      }
      return result;
    }
  }
}
