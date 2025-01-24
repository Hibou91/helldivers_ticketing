import config from "../config";
import fileUtil from "../utils/fileUtil";
import genericUtils from "../utils/genericUtils";

export default class Locale {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }

  async getLocale() {

    const data = await fileUtil.getFileData(`locale${this.category}.json`);

    if (data == false) {
      return {};
    } else {
      return data;
    }
  }

  static async getLocaleData(category) {
    const data = await fileUtil.getFileData(`locale${category}.json`);
    if (data == false) {
      return {};
    } else {
      return data;
    }
  }

  static async getKeeperData(category) {
    const response = await fileUtil.getFileData(`locale${category}.json`);

    if (response == false || !response.keeper) {
      return {
        config: config.locales.keepers[category],
      };
    } else {
      response.keeper.config = config.locales.keepers[category];
      
      return response.keeper;
    }
  }

  async getClassKeeperData() {
    const response = await fileUtil.getFileData(`locale${this.category}.json`);

    if (response == false) {
      return {
        config: config.locales.keepers[this.category],
      };
    } else {
      if (response.keeper) {
        response.keeper.config = config.locales.keepers[this.category];
        return response.keeper;
      } else {
        return {
          config: config.locales.keepers[this.category],
        };
      }
    }
  }

  async getQuestCategoryData(category) {
    const locale = await this.getLocale();

    if (
      locale &&
      locale.questCategories &&
      locale.questCategories.length != 0
    ) {
      return locale.questCategories;
    }
    return [];
  }

  async postQuestCategoryData(category, data) {
    
    const locale = await this.getLocale();
    data = JSON.parse(data);
    if (locale == false) {
   
      locale = {
        questCategories: [],
      };
    }

    
    if (locale && !locale.questCategories) {
      locale.questCategories = [];
    }

    if (locale && locale.questCategories) {
  
      const newCategory = {
        id: genericUtils.createId(locale.questCategories),
        name: data.name,
        color: data.color,
        brightness: data.brightness
      }
      locale.questCategories.push(newCategory);
      if(await fileUtil.postFileData(`locale${category}.json`, locale) == true) {
        return newCategory
      }
    }
    
    return false
  }

  async putQuestCategoryData(category, id, data) {
    const locale = await this.getLocale();
    

    if (locale == false || !locale.questCategories) {
      log('locale not found')
      return false;
    }
    data = JSON.parse(data);
    let i = 0;
    let found = false;

    while (i < locale.questCategories.length && found == false) {
      if (locale.questCategories[i].id == id) {
        found = true;
        locale.questCategories[i].name = data.name;
        locale.questCategories[i].color = data.color;
        locale.questCategories[i].brightness = data.brightness
        return await fileUtil.postFileData(`locale${category}.json`, locale);
      }

      i++;
    }

    return false;
  }

  async deleteQuestCategoryData(id) {
    const locale = await this.getLocale();

    if (locale == false || !locale.questCategories) {
      return false;
    }

    let i = 0;
    let found = false;

    while (i < locale.questCategories.length && found == false) {
      if (locale.questCategories[i].id == id) {
        found = true;
        locale.questCategories.splice(i, 1);
        return await fileUtil.postFileData(
          `locale${this.category}.json`,
          locale
        );
      }
      i++;
    }

    return false;
  }
}
