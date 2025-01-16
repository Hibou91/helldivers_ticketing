import { ipcMain } from "electron";
import { app } from 'electron';

import Quest from "./classes/Quest";
import Castle from "./classes/Castle";
import Notifications from "./classes/Notifications";
import Scheduler from "./classes/Scheduler";
import Scavenges from "./classes/Scavenges";

export default class Game {
  constructor() {
    this.castle = new Castle()
    this.quests = new Quest();
    this.notifications = new Notifications();
    this.scheduler = new Scheduler();
    this.scavenges = new Scavenges

    ipcMain.handle("quitProgram", () => app.quit());
    
  }



}
