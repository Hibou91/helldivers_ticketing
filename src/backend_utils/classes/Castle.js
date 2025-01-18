import config from "../config";
import Locale from "./Locale";
import fs from "node:fs/promises";
import { ipcMain } from "electron";
import fileUtil from "../utils/fileUtil";

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

  async getCastleData() {
    let castleData = await fileUtil.getFileData("castle.json");
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
    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += "/forge_first" + "/castle.json";
    const result = await fs.writeFile(url, JSON.stringify(data), (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
    return result;
  }
}
