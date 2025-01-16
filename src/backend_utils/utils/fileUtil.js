import config from "../config";
import fs from "node:fs/promises";

export default {
  async getFileData(fileName) {
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/${fileName}`;
      let data = await fs.readFile(url, { encoding: "utf8" });
      data = JSON.parse(data);

      if (!data || data == "") {
        return false;
      }

      return data;
    } catch (err) {
      return false;
    }
  },

  async postFileData(fileName, data) {
    let result = true;
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/${fileName}`;
      
      await fs.writeFile(url, JSON.stringify(data), (err) => {
        if (err) {
          result = false;
        }
      });
    } catch (e) {
      result = false;
    }
    return result
  },
};
