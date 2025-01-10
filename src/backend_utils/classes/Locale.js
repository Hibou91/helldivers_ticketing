import fs from "node:fs/promises";
import config from "../config";

export default class Locale {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  
  }



  async getLocale() {
    try {
          let url =
            process.env.APPDATA ||
            (process.platform == "darwin"
              ? process.env.HOME + "/Library/Preferences"
              : process.env.HOME + "/.local/share");
          url += `/helldivers_ticketing/locale${this.category}.json`;
          let data = await fs.readFile(url, { encoding: "utf8" });
          data = JSON.parse(data)
            
          return data;
        } catch (err) {
          return [];
        }
  }
}
