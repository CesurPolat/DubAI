import { ipcMain, dialog, ipcRenderer } from "electron";
import { exec } from 'child_process';
import { ConfigService } from "./config.service";

export enum SetupStatus {
  OK = 0,
  NO_VIDEOS_DIRECTORY = -1,
  NO_GPT_TOKEN = -2,
  NO_FFMPEG = -3
}

export class SetupService {

  constructor() {
    this.initListeners();
  }

  initListeners(): void {
    ipcMain.handle('selectVideosDirectory', this.selectVideosDirectory)
    ipcMain.handle('setGPTToken', (event, token: string) => this.setGPTToken(token))
    ipcMain.handle('setupChecker', async (event) => this.setupChecker())

  }

  selectVideosDirectory(): string {

     var result = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })?.[0] || '-1';

    if (result !== '-1') {
      ConfigService.set('videosDirectory', result);
    }

    return result;

  }

  setGPTToken(token: string): boolean {
    ConfigService.set('gptToken', token);
    return true;
  }

  async checkFFmpeg(): Promise<boolean> {
    return new Promise((resolve) => {
      exec('ffmpeg -version', (error, stdout, stderr) => {
        if (error) {
          console.log('FFmpeg not found:', error.message);
          resolve(false);
        } else {
          console.log('FFmpeg found:', stdout.split('\n')[0]);
          resolve(true);
        }
      });
    });
  }

  async setupChecker(): Promise<number> {
    if (!ConfigService.has('videosDirectory'))
        return SetupStatus.NO_VIDEOS_DIRECTORY;

      if (!ConfigService.has('gptToken'))
        return SetupStatus.NO_GPT_TOKEN;

      if (!(await this.checkFFmpeg()))
        return SetupStatus.NO_FFMPEG;

      return SetupStatus.OK;

  }

}
