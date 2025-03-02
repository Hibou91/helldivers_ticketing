
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
      

      if (!data || data == "") {
        return false;
      }
      data = JSON.parse(data);
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

  async importFileData(url) {
    try {
      
      let data = await fs.readFile(decodeURI(url), { encoding: "utf8" });
      

      if (!data || data == "") {
        return false;
      }
      data = JSON.parse(data);
      return data;
    } catch (err) {
      return false;
    }
  },

  async exportFileData(url, data) {
    let result = true;
    try {
      
      await fs.writeFile(decodeURI(url), JSON.stringify(data), (err) => {
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
