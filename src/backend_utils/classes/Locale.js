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
      let keeper = {
        config: config.locales.keepers[category],
        skills: {
          cunning: 0,
          strength: 0,
          charisma: 0,
        },
      }

      keeper.title = Locale.addKeeperTitle(keeper.skills)
      
      return keeper;
    } else {
      response.keeper.config = config.locales.keepers[category];
      response.keeper.skills = {
        cunning: response.keeper.skills.cunning ?? 0,
        strength: response.keeper.skills.strength ?? 0,
        charisma: response.keeper.skills.charisma ?? 0,
      };
      response.keeper.title = Locale.addKeeperTitle(response.keeper.skills)
     
      return response.keeper;
    }
  }

  async getClassKeeperData() {
    const response = await fileUtil.getFileData(`locale${this.category}.json`);

    if (response == false) {
      let keeper = {
        config: config.locales.keepers[this.category],
        skills: {
          cunning: 0,
          strength: 0,
          charisma: 0,
        },
      }
      keeper.title = Locale.addKeeperTitle(keeper.skills)
      return keeper;
    } else {
      if (!response.keeper) {
        response.keeper = {};
      }
      response.keeper.skills = {
        cunning: response.keeper.skills.cunning  ?? 0,
        strength: response.keeper.skills.strength ?? 0,
        charisma: response.keeper.skills.charisma ?? 0,
      
      }

      response.keeper.config = config.locales.keepers[this.category];

      response.keeper.title = Locale.addKeeperTitle(response.keeper.skills)

      return response.keeper;
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
        brightness: data.brightness,
      };
      locale.questCategories.push(newCategory);
      if (
        (await fileUtil.postFileData(`locale${category}.json`, locale)) == true
      ) {
        return newCategory;
      }
    }

    return false;
  }

  async putQuestCategoryData(category, id, data) {
    const locale = await this.getLocale();

    if (locale == false || !locale.questCategories) {
      log("locale not found");
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
        locale.questCategories[i].brightness = data.brightness;
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

  async levelUpKeeper(skill) {
    const locale = await this.getLocale();
    if (!locale.keeper) {
      locale.keeper = {};
    }

    if (!locale.keeper.skills) {
      locale.keeper.skills = {};
    }

    if (!locale.keeper.skills[skill]) {
      locale.keeper.skills[skill] = 1;
    } else {
      locale.keeper.skills[skill] += 1;
    }
    return await fileUtil.postFileData(`locale${this.category}.json`, locale);
  }

  async levelDownKeeper(skill) {
    const locale = await this.getLocale();

    if (
      locale.keeper &&
      locale.keeper.skills &&
      locale.keeper.skills[skill] &&
      locale.keeper.skills[skill] > 0
    ) {
      locale.keeper.skills[skill] -= 1;
      return await fileUtil.postFileData(`locale${this.category}.json`, locale);
    } else {
      return false;
    }
  }

  static addKeeperTitle(skills){
    

    //one skill
    if(skills.charisma > skills.strength && skills.charisma > skills.cunning){
      return "Fair"
    }
    if(skills.strength > skills.charisma && skills.strength > skills.cunning){
      return "Great"
    }
    if(skills.cunning > skills.charisma && skills.cunning > skills.strength){
      return "Wise"
    }

    //two skills

    if(skills.cunning > skills.charisma && skills.cunning == skills.strength){
      return "Rouge"
    }

    if(skills.charisma > skills.cunning && skills.charisma == skills.strength){
      return "Knight"
    }

    if(skills.cunning > skills.strength && skills.cunning == skills.charisma){
      return "Trickster"
    }

    return "Opportunist"
  }
}
