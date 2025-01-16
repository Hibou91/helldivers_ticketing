import fs from "node:fs/promises";
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
    try {
      let url =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      url += `/helldivers_ticketing/scavenges.json`;
      let data = await fs.readFile(url, { encoding: "utf8" });
      data = JSON.parse(data);

      if (!data || data == "") {
        return [];
      }

      return data;
    } catch (err) {
      return [];
    }
  }

  static async getScavengesConditional(category, state) {
    const scavenges = await Scavenges.getScavenges();

    const result = [];

    scavenges.forEach((e) => {
      if (e.category == category && e.state == state) {
        result.push(e);
      }
    });

    return result;
  }

  static async getScavengesConditional(category) {
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
    const scavenges = await Scavenges.getScavengesConditional(category);

    const result = {
      action: "",
      scavenges: [],
    };
    if (scavenges.length == 0) {
      result.action = "GENERATE";
      result.scavenges = await this.generateScavenges(category);
      return result;
    }

    if (scavenges.length == 1) {
      if (scavenges[0].state == "ACTIVE") {
        result.action = "ACTIVE";
        result.scavenges.push(this.toFrontendDto(scavenges[0]));
        return result;
      } else if (scavenges[0].state == "FINISHED") {
        result.action = "FINISHED";
        result.scavenges.push(this.toFrontendDto(scavenges[0]));
        return result;
      }
    }

    let d = new Date();
      if (d.getMinutes() != scavenges[0].generationTime.getMinutes()) {
        Scavenges.deleteScavengesConditional(category, "generated");
        result.action = "GENERATE";
        result.scavenges = this.generateScavenges(category);
        return result;
      } else {
        result.action = "GENERATE";
        result.scavenges.push(this.toFrontendDto(scavenges[0]));
        return result;
      }
  }

  static async deleteScavengesConditional(category, state) {
    const scavenges = await Scavenges.getScavenges();

    for (let i = 0; i < scavenges.length; i++) {
      if (scavenges[i].category == category && scavenges[i].state == state) {
        scavenges.splice(i, 1);
        i--;
      }
    }

    fileUtil.postFileData("scavenges.json", scavenges);
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
      if (scavenges.id == id) {
        found = true;
        (scavenges[i].state = "ACTIVE"), (scavenges[i].time = new Date());
        scavenges[i].time.setTime(
          scavenges[i].time.getTime() +
            scavenges[i].duration /* * 60 * 60*/ * 1000
        );
        category = scavenges[i].category;
        return await fileUtil.postFileData("scavenges.json", scavenges);
      }
      i++;
    }
    Scavenges.deleteScavengesConditional(category, "generated");
  }

  static async finishScavenge(id) {
    let scavenges = await Scavenges.getScavenges();

    let i = 0;
    let found = false;

    while (i < scavenges.length && found == false) {
      if (scavenges.id == id) {
        found = true;
        scavenges[i].state = "FINISHED";
        scavenges[i].success = Math.random() * 100 > scavenges[i].successRate;
        return await fileUtil.postFileData("scavenges.json", scavenges);
      }
      i++;
    }
  }

  async generateScavenges(category) {
    const scavenges = await Scavenges.getScavenges();
    this.generatedScavenges = [];
    for (let i = 0; i < 3; i++) {
      const newScavenge = {
        category: category,
        id: genericUtils.createId(scavenges),
        difficulty: Math.round(Math.random() * 50),
        type: Math.round(Math.random() * 2),
        target: Math.round(Math.random() * 2),
        time: 1,
        duration: 10, // Math.round(Math.random() * ( 6-3) + 3),
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
      if (keeper && keeper.skills) {
        newScavenge.skillBonus = 0;
        config.scavenges.targets[newScavenge.target].skills.forEach((e) => {
          newScavenge.skillBonus += Math.round(
            Math.random() * keeper.skills[e]
          );
        });
      } else {
        newScavenge.skillBonus = 0;
      }

      newScavenge.successRate = Math.min(
        newScavenge.difficulty +
          newScavenge.skillBonus +
          newScavenge.keeperbonus,
        100
      );
      this.generatedScavenges.push(this.toFrontendDto(newScavenge));
      scavenges.push(newScavenge);
    }

    fileUtil.postFileData(`scavenges.json`, scavenges);
    return this.generatedScavenges;
  }

  toFrontendDto(scavenge) {
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
