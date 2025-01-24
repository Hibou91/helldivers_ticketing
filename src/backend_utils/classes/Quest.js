import { ipcMain } from "electron";
import fs from "node:fs/promises";
import config from "../config";
import genericUtils from "../utils/genericUtils";
import Notifications from "./Notifications";
import fileUtil from "../utils/fileUtil";

export default class Quest {
  constructor() {
    this.setUpHandlers();
  }

  setUpHandlers() {
    ipcMain.handle("getAllQuests", (event, category) =>
      this.getAllQuests(category)
    );
    ipcMain.handle("getQuestById", (event, category, id) =>
      this.getQuestById(category, id)
    );
    ipcMain.handle("postQuest", (event, category, data) =>
      this.postQuest(category, data)
    );
    ipcMain.handle("putQuest", (event, category, data) =>
      this.putQuest(category, data)
    );
    ipcMain.handle("deleteQuest", (event, category, data) =>
      this.deleteQuest(category, data)
    );
  }

  async getAllQuests(category) {
    const data = await this.getAllQuestsData(category);
    data.forEach((e) => {
      e = this.toFrontendDto(e);
    });
    return data;
  }

  async getAllQuestsData(category) {
    const data = await fileUtil.getFileData(`quests${category}.json`);
    if (data == false) {
      return [];
    } else {
      return data;
    }
  }

  async postQuest(category, data) {
    const quests = await this.getAllQuestsData(category);

    const questToPost = JSON.parse(data);
    const newQuest = {};
    newQuest.title = questToPost.title;
    newQuest.description = questToPost.description;
    newQuest.priority = questToPost.priority;
    newQuest.id = genericUtils.createId(quests);
    newQuest.created = Date.now();
    newQuest.progress = questToPost.progress;
    newQuest.waitingFor = questToPost.waitingFor;
    newQuest.questCategory = questToPost.questCategory;
    newQuest.needSubQuest = questToPost.needSubQuest;
    newQuest.subQuests = questToPost.subQuests;

    quests.push(newQuest);

    const result = await fileUtil.postFileData(
      `quests${category}.json`,
      quests
    );
    if (result == false) {
      return false;
    } else {
      return this.toFrontendDto(newQuest);
    }
  }

  async putQuest(category, data) {
    const quests = await this.getAllQuestsData(category);
    const updateQuest = JSON.parse(data);
    quests.forEach((e) => {
      if (e.id == updateQuest.id) {
        e.title = updateQuest.title;
        e.description = updateQuest.description;
        e.priority = updateQuest.priority;
        e.progress = updateQuest.progress;
        e.waitingFor = updateQuest.waitingFor;
        e.questCategory = updateQuest.questCategory;
        e.needSubQuest = updateQuest.needSubQuest;
        e.subQuests = updateQuest.subQuests;
      }
    });

    const result = await fileUtil.postFileData(
      `quests${category}.json`,
      quests
    );
    if (result == false) {
      return false;
    } else {
      return this.toFrontendDto(updateQuest);
    }
  }

  async deleteQuest(category, data) {
    const quests = await this.getAllQuestsData(category);
    const updateQuest = JSON.parse(data);

    for (let i = 0; i < quests.length; i++) {
      if (quests[i].id == updateQuest.id) {
        quests.splice(i, 1);
      }
    }

    const result = await fileUtil.postFileData(
      `quests${category}.json`,
      quests
    );

    Notifications.deleteQuestNotifications(updateQuest.id);

    return result;
  }

  async getQuestById(category, id) {
    const data = await this.getAllQuestsData(category);

    let i = 0;
    let found = false;

    while (i < data.length && found == false) {
      if (data[i].id == id) {
        found = true;
        return this.toFrontendDto(data[i]);
      }
      i++;
    }
  }

  toFrontendDto(quest) {
    quest.progressName = config.quests.progress[quest.progress];
    quest.priorityName = config.quests.priority[quest.priority];
    return quest;
  }
}
