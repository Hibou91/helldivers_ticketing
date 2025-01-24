import config from "../config";
import Locale from "./Locale";
import fs from "node:fs/promises";
import { ipcMain } from "electron";
import fileUtil from "../utils/fileUtil";
import Scavenges from "./Scavenges";

export default class Castle {
  constructor() {
    this.library = new Locale(
      config.locales.locales.library.name,
      config.locales.locales.library.category
    );
    this.salon = new Locale(
      config.locales.locales.salon.name,
      config.locales.locales.salon.category
    );
    this.garden = new Locale(
      config.locales.locales.garden.name,
      config.locales.locales.garden.category
    );

    this.setUpHandlers();

    this.getCastleData();
  }

  setUpHandlers() {
    ipcMain.handle("getCastleData", (event, category) => this.getCastleData());
    ipcMain.handle("getLocaleData", (event, category) =>
      this.getLocale(category)
    );
    ipcMain.handle("getLocaleKeeperData", (event, category) =>
      this.getLocaleKeeperData(category)
    );

    ipcMain.handle("getQuestCategoryData", (event, category) =>
      this.getQuestCategoryData(category)
    );
    ipcMain.handle("postQuestCategoryData", (event, category, data) =>
      this.postQuestCategoryData(category, data)
    );
    ipcMain.handle("putQuestCategoryData", (event, category, id, data) =>
      this.putQuestCategoryData(category, id, data)
    );
    ipcMain.handle("deleteQuestCategoryData", (event, category, id) =>
      this.deleteQuestCategoryData(category, id)
    );
    ipcMain.handle("claimScavenge", (event, id) =>
      this.claimScavenge(id)
    );
  }

  getLocale(category) {

    switch (category) {
      case "0":
        return this.library.getLocale();
        break;
      case "1":
        return this.salon.getLocale();
        break;
      case "2":
        return this.garden.getLocale();
        break;

      default:
        return {};
        break;
    }
  }

  getLocaleKeeperData(category) {
    switch (category) {
      case "0":
        return this.library.getClassKeeperData();
        break;
      case "1":
        return this.salon.getClassKeeperData();
        break;
      case "2":
        return this.garden.getClassKeeperData();
        break;

      default:
        return {};
        break;
    }
  }

  getQuestCategoryData(category) {
    switch (category) {
      case "0":
        return this.library.getQuestCategoryData(category);
        break;
      case "1":
        return this.salon.getQuestCategoryData(category);
        break;
      case "2":
        return this.garden.getQuestCategoryData(category);
        break;

      default:
        return {};
        break;
    }
  }

  async postQuestCategoryData(category, data) {
    
    switch (category) {
      case "0":
        return await this.library.postQuestCategoryData(category, data);
        break;
      case "1":
        return await this.salon.postQuestCategoryData(category, data);
        break;
      case "2":
        return await this.garden.postQuestCategoryData(category, data);
        break;

      default:
        return {};
        break;
    }
  }

  putQuestCategoryData(category, id, data) {
    switch (category) {
      case "0":
        return this.library.putQuestCategoryData(category, id, data);
        break;
      case "1":
        return this.salon.putQuestCategoryData(category, id, data);
        break;
      case "2":
        return this.garden.putQuestCategoryData(category, id, data);
        break;

      default:
        return {};
        break;
    }
  }

  deleteQuestCategoryData(category, id) {
    switch (category) {
      case "0":
        return this.library.deleteQuestCategoryData(id);
        break;
      case "1":
        return this.salon.deleteQuestCategoryData(id);
        break;
      case "2":
        return this.garden.deleteQuestCategoryData(id);
        break;

      default:
        return {};
        break;
    }
  }

  async getRawCastleData() {
    let castleData = await fileUtil.getFileData("castle.json");
    if (castleData == false) {
      castleData = { };
    } 

    return castleData;
  }

  async getCastleData() {
    let castleData = await this.getRawCastleData();
    if (castleData == false) {
      castleData = {
        locales: config.locales.locales,
      };
    } else {
      castleData.locales = config.locales.locales;
    }

    return castleData;
  }

  async saveCastleData(data) {
    return await fileUtil.postFileData("castle.json", data)
  }

  async claimScavenge(id){
    const scavenge = await Scavenges.claimScavenge(id);
    const castleData = await this.getRawCastleData();

    if(castleData == false){
      castleData = {}
    }

    if(!castleData.materials){
      castleData.materials = {}
    }

    scavenge.loot.forEach((loot) => {
      
 
      
      if(!castleData.materials[loot.name]){
        if(config.scavenges.materials[loot.name.toLowerCase()].storeMax){
          castleData.materials[loot.name] = Math.min(loot.count, config.scavenges.materials[loot.name.toLowerCase()].storeMax)
        }else{

        }
        castleData.materials[loot.name] = loot.count
      }else{
        if(config.scavenges.materials[loot.name.toLowerCase()].storeMax){
          castleData.materials[loot.name.toLowerCase()] = Math.min(loot.count*1 + castleData.materials[loot.name]*1, config.scavenges.materials[loot.name.toLowerCase()].storeMax);
        }else{
          castleData.materials[loot.name.toLowerCase()] = loot.count*1 + castleData.materials[loot.name]*1;
        }
        
      }
    });
    return await fileUtil.postFileData("castle.json", castleData)
  }

  
}
