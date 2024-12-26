import fs from "node:fs/promises";

export default class Locale {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }

  async getQuests() {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += "/forge_first";
      const data = await fs.readFile(url + "/tasks.json", { encoding: "utf8" });
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
}
