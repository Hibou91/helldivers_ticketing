import config from "../config";
import Locale from "./Locale";
import fs from "node:fs/promises";
import { ipcMain } from "electron";

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
    ipcMain.handle("getCastleData", (event, category) => this.getCastleData());
    this.getCastleData();
  }

  async getCastleData() {
    this.level = 0;
    this.resources = 0;

    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += "/forge_first" + "/castle.json";
      const data = await fs.readFile(url, { encoding: "utf8" });
      const castleData = JSON.parse.parse(data)
      castleData.locales = config.locales.locales
      return 
    } catch (err) {
      const castleData = {}
      castleData.locales = config.locales.locales
      return castleData
    }
  }

  async saveCastleData() {
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
