import { ipcMain } from "electron";
import genericUtils from "../utils/genericUtils";
import config from "../config";
import fileUtil from "../utils/fileUtil";
import Locale from "./Locale";

export default class Scavenges {
  constructor() {
    this.setUpHandlers();
  }

  setUpHandlers() {
    ipcMain.handle("postScavenge", (event, id) => this.postScavenge(id));
    ipcMain.handle("deleteScavenge", (event, id) => this.deleteScavenge(id));
    ipcMain.handle("getScavenges", (event) => Scavenges.getScavenges());
    ipcMain.handle("generateScavenges", (event, category) =>
      this.getScavengesforFrontend(category)
    );
  }

  static async getScavenges() {
    const data = await fileUtil.getFileData(`scavenges.json`);
    if (data == false) {
      return [];
    } else {
      return data;
    }
  }

  static async getScavengesForCategoryState(category, state) {
    const scavenges = await Scavenges.getScavenges();

    const result = [];

    scavenges.forEach((e) => {
      if (e.category == category && e.state == state) {
        result.push(e);
      }
    });

    return result;
  }

  static async getScavengesForCategory(category) {
    const scavenges = await Scavenges.getScavenges();

    const result = [];

    scavenges.forEach((e) => {
      if (e.category == category) {
        result.push(e);
      }
    });

    return result;
  }

  async getScavengesforFrontend(category) {
    if(!category){
      return
    }
    const scavenges = await Scavenges.getScavengesForCategory(category);

    const result = {
      action: "",
      scavenges: [],
    };
    if (scavenges.length == 0) {
      result.action = "GENERATE";
      result.scavenges = await this.generateScavenges(category);
      return result;
    } else if (scavenges.length == 1) {
      if (scavenges[0].state == "ACTIVE") {
        result.action = "ACTIVE";
        result.scavenges = [Scavenges.toFrontendDto(scavenges[0])];
        return result;
      } else if (scavenges[0].state == "FINISHED") {
        result.action = "FINISHED";
        result.scavenges = [Scavenges.toFrontendDto(scavenges[0])];
        return result;
      }
    } else {
      let d = new Date();
      let dValue = new Date(scavenges[0].generationTime);
      if (d.getDay() != dValue.getDay()) {
        await Scavenges.deleteScavengesConditional(category, "GENERATED");
        result.action = "GENERATE";
        result.scavenges = await this.generateScavenges(category);
        return result;
      } else {
        result.action = "GENERATE";
        result.scavenges = scavenges;
        return result;
      }
    }
  }

  static async deleteScavengesConditional(category, state) {
    const scavenges = await Scavenges.getScavenges();
    const newArray = scavenges.filter(
      (e) => !(e.category == category && e.state == state)
    );

    fileUtil.postFileData("scavenges.json", newArray);
  }

  async deleteScavenge(id) {
    let scavenges = await Scavenges.getScavenges();

    let i = 0;
    let found = false;
    while (i < scavenges.length && found == false) {
      if (scavenges[i].id == id) {
        found = true;
        scavenges.splice(i, 1);
      }
      i++;
    }

    return await fileUtil.postFileData("scavenges.json", scavenges);
  }

  async postScavenge(id) {
    let scavenges = await Scavenges.getScavenges();

    let i = 0;
    let found = false;
    let category;

    while (i < scavenges.length && found == false) {
      if (scavenges[i].id == id) {
        found = true;
        scavenges[i].state = "ACTIVE";
        scavenges[i].time = new Date();
        scavenges[i].time.setTime(
          scavenges[i].time.getTime() +
            scavenges[i].duration * 60 * 60 * 1000
        );
        category = scavenges[i].category;
        await fileUtil.postFileData("scavenges.json", scavenges);
      }
      i++;
    }
    if (found) {
      await Scavenges.deleteScavengesConditional(category, "GENERATED");
    }

    return found;
  }

  static async finishScavenge(id) {
    let scavenges = await Scavenges.getScavenges();
    let materialConfig = await fileUtil.getFileData('materialConfig.json')
    if(materialConfig == false){
      materialConfig = config.scavenges.materials;
      await fileUtil.postFileData('materialConfig.json', materialConfig)
    }
    let i = 0;
    let found = false;

    while (i < scavenges.length && found == false) {
      if (scavenges[i].id == id) {
        found = true;
        scavenges[i].state = "FINISHED";
        scavenges[i].success = Math.random() * 100 < scavenges[i].successRate;
        scavenges[i].loot = [];
        if (scavenges[i].success == true) {
          for (const [key, material] of Object.entries(
            materialConfig
          )) {
            if (
              material.category == undefined ||
              material.category == scavenges[i].type
            ) {
              if (Math.random() < material.occurrence) {
                scavenges[i].loot.push({
                  name: material.name,
                  count: Math.round(
                    Math.random() * (material.countmax - material.countmin) +
                      material.countmin
                  ),
                });
              }
            }
          }
        } else {
          
          scavenges[i].loot.push({
            name: materialConfig.anima.name,
            count: Math.round(
              (Math.random() *
                (materialConfig.anima.countmax -
                  materialConfig.anima.countmin) +
                  materialConfig.anima.countmin) /
                2
            ),
          });
        }

        fileUtil.postFileData("scavenges.json", scavenges);
        return Scavenges.toFrontendDto(scavenges[i]);
      }
      i++;
    }
    return false;
  }

  async generateScavenges(category) {
    const scavenges = await Scavenges.getScavenges();
    const generatedScavenges = [];
    for (let i = 0; i < 3; i++) {
      const newScavenge = {
        category: category,
        id: genericUtils.createId(scavenges),
        difficulty: Math.round(Math.random() * 50),
        type: Math.round(Math.random() * 2),
        target: Math.round(Math.random() * 2),
        time: 1,
        duration: Math.round(Math.random() * ( 6-3) + 3),
        keeperbonus: 0,
        skillBonus: 0,
        state: "GENERATED",
        generationTime: new Date(),
      };

      newScavenge.keeperbonus =
        category == newScavenge.type
          ? Math.round(Math.random() * (10 - 5) + 5)
          : 0;
      const keeper = await Locale.getKeeperData(category);
      newScavenge.skillBonus = 0;
      if (keeper && keeper.skills) {
        config.scavenges.targets[newScavenge.target].skills.forEach((e) => {
          newScavenge.skillBonus += Math.round(
            Math.random() * keeper.skills[e.toLowerCase()]
          );
        });
      }

      newScavenge.successRate = Math.min(
        newScavenge.difficulty +
          newScavenge.skillBonus +
          newScavenge.keeperbonus,
        100
      );
      generatedScavenges.push(Scavenges.toFrontendDto(newScavenge));
      scavenges.push(newScavenge);
    }

    fileUtil.postFileData(`scavenges.json`, scavenges);
    return generatedScavenges;
  }

  static async claimScavenge(id) {
    let scavenges = await Scavenges.getScavenges();

    let i = 0;
    let found = false;

    while (i < scavenges.length && found == false) {
      if (scavenges[i].id == id) {
        found = structuredClone(scavenges[i]);
        scavenges.splice(i, 1);
        await fileUtil.postFileData("scavenges.json", scavenges);
      }
      i++;
    }

    return found;
  }

  static toFrontendDto(scavenge) {
    switch (scavenge.type) {
      case 0:
        scavenge.typeName = "Dungeons";
        scavenge.typeModel = "DUNGEONS";
        break;
      case 1:
        scavenge.typeName = "Village";
        scavenge.typeModel = "VILLAGE";
        break;
      case 2:
        scavenge.typeName = "Forest";
        scavenge.typeModel = "FOREST";
        break;

      default:
        break;
    }

    scavenge.targetName = config.scavenges.targets[scavenge.target].name;
    scavenge.targetSkills = config.scavenges.targets[scavenge.target].skills;

    return scavenge;
  }
}
