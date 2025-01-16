import fs from "node:fs/promises";
import config from "../config";
import fileUtil from "../utils/fileUtil";

export default class Locale {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  
  }



  async getLocale() {
    return await fileUtil.getFileData(`locale${this.category}.json`)
   
  }

  static async getLocaleData(category) {
    return await fileUtil.getFileData(`locale${category}.json`)
  }

  static async getKeeperData(category) {
    const response = await fileUtil.getFileData(`locale${category}.json`)
    
    if(response == false){
      return {
        config: config.locales.keepers[category]
      }
    }else{
      response.keeper.config = config.locales.keepers[category]
      return response.keeper
    }
    
  }

  async getClassKeeperData() {
    const response = await fileUtil.getFileData(`locale${this.category}.json`)
    
    if(response == false){
      return {
        config: config.locales.keepers[this.category]
      }
    }else{
      response.keeper.config = config.locales.keepers[this.category]
      return response.keeper
    }
    
  }
}
