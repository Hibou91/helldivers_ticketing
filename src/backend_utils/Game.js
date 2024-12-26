import { ipcMain } from "electron";
import { app } from 'electron';

import Quest from "./classes/Quest";
import Castle from "./classes/Castle";

export default class Game {
  constructor() {
    this.castle = new Castle()
    this.quests = new Quest();

    ipcMain.handle("quitProgram", () => app.quit());
    
  }



}
