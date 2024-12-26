import config from "../config";
import fs from "node:fs/promises";

export default {
  getAllQuests: async (category) => {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/quests${category}.json`;
      const data = await fs.readFile(url, { encoding: "utf8" });
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },
  postAllQuests: async (category, data) => {
    let url =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
    url += `/helldivers_ticketing/quests${category}.json`;;
    const result = await fs.writeFile(url, JSON.stringify(data), (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
    return result;
  },
};
