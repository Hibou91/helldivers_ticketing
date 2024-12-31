import { ipcMain } from "electron";
import fs from "node:fs/promises";
import config from "../config";

export default class Quest {
  constructor() {
    this.setUpHandlers();
  }

  setUpHandlers() {
    ipcMain.handle("getAllQuests", (event, category) => this.getAllQuests(category));
    ipcMain.handle("postQuest", (event, category, data) => this.postQuest(category, data));
    ipcMain.handle("putQuest", (event, category, data) => this.putQuest(category, data));
    ipcMain.handle("deleteQuest", (event, category, data) => this.deleteQuest(category, data));
  }

  async getAllQuests(category) {
    const data = await this.getAllQuestsData(category);
    data.forEach((e) => {
      e = this.toFrontendDto(e)
      
    })
    return data;
  }

  async getAllQuestsData(category) {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/quests${category}.json`;
      let data = await fs.readFile(url, { encoding: "utf8" });
      data = JSON.parse(data)
     
      if(!data || data == ''){
        return []
      }

      data.forEach((e) => {
        e.progressName = config.quests.progress[e.progress]
        
      })
      return data;
    } catch (err) {
      return [];
    }
  }

  async postQuest(category, data) {
    const quests = await this.getAllQuestsData(category);

    const questToPost = JSON.parse(data);
    const newQuest = {};
    newQuest.title= questToPost.title;
    newQuest.description = questToPost.description;
    newQuest.priority = questToPost.priority;
    newQuest.id = this.createId(quests)
    newQuest.created = Date.now();
    newQuest.progress = 0;
    quests.push(newQuest);

    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += `/helldivers_ticketing/quests${category}.json`;
    let result = true;
    await fs.writeFile(url, JSON.stringify(quests), (err) => {
      if (err) {
        result = false;
      } 
    });
    
    return this.toFrontendDto (newQuest);;
  }

  async putQuest(category, data) {
    const quests = await this.getAllQuestsData(category);
    const updateQuest = JSON.parse(data);
    quests.forEach((e) => {
      if(e.id == updateQuest.id){
        e.title = updateQuest.title
        e.description = updateQuest.description
        e.priority = updateQuest.priority
        e.progress = updateQuest.progress
      }
    })
    
    
    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += `/helldivers_ticketing/quests${category}.json`;
    const result = await fs.writeFile(url, JSON.stringify(quests), (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
    
    return this.toFrontendDto (updateQuest);
  }

  async deleteQuest(category, data) {
    const quests = await this.getAllQuestsData(category);
    const updateQuest = JSON.parse(data);

    for(let i = 0; i < quests.length; i++){
      if(quests[i].id == updateQuest.id){
        quests.splice(i, 1)
      }
    }
    
    
    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += `/helldivers_ticketing/quests${category}.json`;
    const result = await fs.writeFile(url, JSON.stringify(quests), (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
    
    return result;
  }

  createId (array){
    if(!array || array.length == 0){
      return 1;
    } 
    let id = 1;
    for(let i = 0; i < array.length; i++){
      if(array[i].id > id){
        id = array[i].id;
      }
    }
    
    return ++id;
  }

  toFrontendDto (quest){
    quest.progressName = config.quests.progress[quest.progress]
    quest.priorityName = config.quests.priority[quest.priority]

    return quest;
  }



}
