import config from "../config";
import Locale from "./Locale";
import fs from "node:fs/promises";

export default class Castle {
  constructor() {
    this.library = new Locale(
      config.locales.locales.library.name,
      config.locales.locales.library.category
    );
    this.livingRoom = new Locale(
      config.locales.locales.livingRoom.name,
      config.locales.locales.livingRoom.category
    );
    this.garden = new Locale(
      config.locales.locales.garden.name,
      config.locales.locales.garden.category
    );
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
    } catch (err) {}
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
