import config from "../config";
import Locale from "./Locale";
import { ipcMain } from "electron";
import fileUtil from "../utils/fileUtil";
import Scavenges from "./Scavenges";

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

    this.setUpHandlers();

    //this.getCastleData();
  }

  setUpHandlers() {
    ipcMain.handle("getCastleData", (event, category) => this.getCastleData());
    ipcMain.handle("getCastleConfig", (event) => this.getCastleConfig());
    ipcMain.handle("levelupCastle", (event) => this.levelUpCastle());
    ipcMain.handle("saveCastleConfig", (event, config) => this.saveCastleConfig(config));

    ipcMain.handle("getMaterialConfig", (event) => this.getMaterialConfig());
    ipcMain.handle("saveMaterialConfig", (event, config) => this.saveMaterialConfig(config));
  
    ipcMain.handle("getLocaleData", (event, category) =>
      this.getLocale(category)
    );
    ipcMain.handle("getLocaleKeeperData", (event, category) =>
      this.getLocaleKeeperData(category)
    );
    ipcMain.handle("levelKeeper", (event, category, skill, upOrDown) =>
      this.levelKeeper(category, skill, upOrDown)
    );
    ipcMain.handle("getQuestCategoryData", (event, category) =>
      this.getQuestCategoryData(category)
    );
    ipcMain.handle("postQuestCategoryData", (event, category, data) =>
      this.postQuestCategoryData(category, data)
    );
    ipcMain.handle("putQuestCategoryData", (event, category, id, data) =>
      this.putQuestCategoryData(category, id, data)
    );
    ipcMain.handle("deleteQuestCategoryData", (event, category, id) =>
      this.deleteQuestCategoryData(category, id)
    );
    ipcMain.handle("claimScavenge", (event, id) =>
      this.claimScavenge(id)
    );
  }

  getLocale(category) {

    switch (category) {
      case "0":
        return this.library.getLocale();
        break;
      case "1":
        return this.salon.getLocale();
        break;
      case "2":
        return this.garden.getLocale();
        break;

      default:
        return {};
        break;
    }
  }

  getLocaleKeeperData(category) {
    switch (category) {
      case "0":
        return this.library.getClassKeeperData();
        break;
      case "1":
        return this.salon.getClassKeeperData();
        break;
      case "2":
        return this.garden.getClassKeeperData();
        break;

      default:
        return {};
        break;
    }
  }

  getQuestCategoryData(category) {
    switch (category) {
      case "0":
        return this.library.getQuestCategoryData(category);
        break;
      case "1":
        return this.salon.getQuestCategoryData(category);
        break;
      case "2":
        return this.garden.getQuestCategoryData(category);
        break;

      default:
        return {};
        break;
    }
  }

  async postQuestCategoryData(category, data) {
    
    switch (category) {
      case "0":
        return await this.library.postQuestCategoryData(category, data);
        break;
      case "1":
        return await this.salon.postQuestCategoryData(category, data);
        break;
      case "2":
        return await this.garden.postQuestCategoryData(category, data);
        break;

      default:
        return {};
        break;
    }
  }

  putQuestCategoryData(category, id, data) {
    switch (category) {
      case "0":
        return this.library.putQuestCategoryData(category, id, data);
        break;
      case "1":
        return this.salon.putQuestCategoryData(category, id, data);
        break;
      case "2":
        return this.garden.putQuestCategoryData(category, id, data);
        break;

      default:
        return {};
        break;
    }
  }

  deleteQuestCategoryData(category, id) {
    switch (category) {
      case "0":
        return this.library.deleteQuestCategoryData(id);
        break;
      case "1":
        return this.salon.deleteQuestCategoryData(id);
        break;
      case "2":
        return this.garden.deleteQuestCategoryData(id);
        break;

      default:
        return {};
        break;
    }
  }

  async levelKeeper(category, skill, upOrDown){
    let categoryName = ""
    switch (category) {
      case "0":
        categoryName = "library"
        break;
      case "1":
         categoryName = "salon"
        break;
      case "2":
         categoryName = "garden"
        break;
    }

    let materialName = ""
    switch (skill) {
      case "cunning":
        materialName = "witseed"
        break;
      case "strength":
        materialName = "lionheart"
        break;
      case "charisma":
        materialName = "magefish"
        break;
    }

    const keeperData = await this[categoryName].getClassKeeperData();
 
    
    const castleData = await this.getRawCastleData()

    if(upOrDown == 1){
      let requirement = (keeperData.skills[skill] * castleData.config.levelMultiplier) + castleData.config.levelMultiplier
      if(castleData.materials[materialName] && requirement < castleData.materials[materialName]){
        await this[categoryName].levelUpKeeper(skill);
        castleData.materials[materialName] = castleData.materials[materialName] - requirement
        fileUtil.postFileData("castle.json", castleData)
      }
    }else{
      if(keeperData.skills[skill] == 0){
        return false;
      }
      let cashBack = Math.floor((((keeperData.skills[skill] - 1) * castleData.config.levelMultiplier) + castleData.config.levelMultiplier) / 2) 
      castleData.materials[materialName] = castleData.materials[materialName] + cashBack
      fileUtil.postFileData("castle.json", castleData)
      this[categoryName].levelDownKeeper(skill);
      return true
    }
    

  }

  async getRawCastleData() {
    let castleData = await fileUtil.getFileData("castle.json");
    if (castleData == false) {
      castleData = await this.setUpLevelRequirement(true);
    } 

    return castleData;
  }

  async setUpLevelRequirement(firstRun){
    let castleData = {}
    let castleLevel = 0
    if(!firstRun){
      castleData = await this.getRawCastleData()
      castleLevel = castleData.castleLevel
    }else{
      castleData.config = config.castle
      
    }

    castleData.levelRequirement = {}
    castleData.levelRequirement.anima = ( castleLevel + 1) * castleData.config.animaLevelMultiplier
    let materialArray = ['paper', 'wood', 'silk']
    
    while (materialArray.length > 0){
      let i = Math.floor(Math.random() * (materialArray.length - 1))
      const max = ( castleLevel + 1) * castleData.config.levelMultiplier
      castleData.levelRequirement[materialArray[i]] = Math.round(max / materialArray.length )
      materialArray.splice(i, 1)
    }

    if(firstRun){
      castleData.materials = {}
      
      fileUtil.postFileData('castle.json', castleData)
      fileUtil.postFileData('materialConfig.json', config.scavenges.materials)
    }

    return castleData
    
  }

  async levelUpCastle(){
    let castleData = await this.getRawCastleData()

    if(!castleData.levelRequirement){
      this.setUpLevelRequirement();
      return false;
    }

    if(!castleData.materials){
      return false
    }

    let lever = true;
    let newMaterialsObject = {};

    for (const [key, value] of Object.entries(castleData.levelRequirement)) {
      if(castleData.materials[key] - value >= 0){
        newMaterialsObject[key] = castleData.materials[key] - value
      }else{
        lever = false
      }
    }

    if(lever == false){
      return false
    }

    castleData.materials = newMaterialsObject

    if(!castleData.castleLevel){
      castleData.castleLevel = 2
    }else{
      castleData.castleLevel = castleData.castleLevel + 1
    }

    fileUtil.postFileData('castle.json', castleData)
    await this.setUpLevelRequirement()
    return this.getCastleData()
  }

  async getCastleData() {
    let castleData = await this.getRawCastleData();
    if (castleData == false) {
      castleData = {
        locales: config.locales.locales,
      };
    } else {
      castleData.locales = config.locales.locales;
    }

    return castleData;
  }

  async getCastleConfig() {
    let castleData = await this.getRawCastleData();
   

    return castleData;
  }

  async saveCastleData(data) {
    return await fileUtil.postFileData("castle.json", data)
  }

  async saveCastleConfig(config){
    
    const castleData = await this.getRawCastleData();

    castleData.config.levelMultiplier = config.levelMultiplier
    castleData.config.storageMultiplier = config.storageMultiplier
    castleData.config.animaLevelMultiplier = config.animaLevelMultiplier

    return await fileUtil.postFileData("castle.json", castleData)
  }

  async claimScavenge(id){
    const scavenge = await Scavenges.claimScavenge(id);
    const castleData = await this.getRawCastleData();

    if(!castleData.materials){
      castleData.materials = {}
    }

    scavenge.loot.forEach((loot) => {

      let castleLevel = 0
      if(castleData.castleLevel){
        castleLevel = castleData.castleLevel
      }

      if(loot.name == 'anima'){
        let storeMax = (castleLevel + 1) * castleData.config.animaLevelMultiplier * castleData.config.storageMultiplier
      }else{
        let storeMax = (castleLevel + 1) * castleData.config.levelMultiplier * castleData.config.storageMultiplier
      }
      let storeMax = (castleLevel + 1) * castleData.config.levelMultiplier * castleData.config.storageMultiplier
      
      if(!castleData.materials[loot.name.toLowerCase()]){
        castleData.materials[loot.name.toLowerCase()] = Math.min(loot.count, storeMax)
        
      }else{
        castleData.materials[loot.name.toLowerCase()] = castleData.materials[loot.name.toLowerCase()] + Math.min(loot.count, storeMax)
      }
    });
    return await fileUtil.postFileData("castle.json", castleData)
  }

  async getMaterialConfig () {

    let materialConfig = await fileUtil.getFileData('materialConfig.json')
    if(materialConfig == false){
      materialConfig = config.scavenges.materials
      await fileUtil.postFileData("materialConfig.json", materialConfig)
    }
    return materialConfig
  }

  async saveMaterialConfig (data) {
    const materialConfig = structuredClone(config.scavenges.materials)
    for (const [key, material] of Object.entries(materialConfig)){
      material.occurrence = data[key].occurrence
      material.countmin = data[key].countmin
      material.countmax = data[key].countmax
      material.category = data[key].category
    }

    return await fileUtil.postFileData("materialConfig.json", materialConfig)
  }
  
}
