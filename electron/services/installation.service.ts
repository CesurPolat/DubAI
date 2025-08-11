import { ipcMain, dialog, ipcRenderer } from "electron";
import { exec } from 'child_process';
import Store from 'electron-store';

//Note that this is not intended for security purposes, since the encryption key would be easily 
//found inside a plain - text Node.js app.
//
//Its main use is for obscurity.If a user looks through the config directory and finds the config file, 
//since it's just a JSON file, they may be tempted to modify it. By providing an encryption key, the
// file will be obfuscated, which should hopefully deter any users from doing so.

const store = new Store({ encryptionKey: 'SBDS9ZB8pr/RUgSeQWnd/tfuocRiNCVmctwsOCFGhUlE36eD+IwaU/Hi9i9t8OdD' });

export enum SetupStatus {
  OK = 0,
  NO_VIDEOS_DIRECTORY = -1,
  NO_GPT_TOKEN = -2,
  NO_FFMPEG = -3
}

export class InstallationService {

  constructor() {
    this.initListeners();
  }

  initListeners(): void {
    ipcMain.handle('selectVideosDirectory', this.selectVideosDirectory)
    ipcMain.handle('setGPTToken', (event, token: string) => this.setGPTToken(token))
    ipcMain.handle('setupChecker', async (event) => this.setupChecker())

  }

  selectVideosDirectory(): boolean {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then((result: any) => {
      if (!result.canceled) {
        store.set('videosDirectory', result.filePaths[0]);
      }
    }).catch((err: any) => {
      console.error(err)
    })

    return store.has('videosDirectory');
  }

  setGPTToken(token: string): boolean {
    store.set('gptToken', token);
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
    if (!store.has('videosDirectory'))
        return SetupStatus.NO_VIDEOS_DIRECTORY;

      if (!store.has('gptToken'))
        return SetupStatus.NO_GPT_TOKEN;

      if (!(await this.checkFFmpeg()))
        return SetupStatus.NO_FFMPEG;

      return SetupStatus.OK;

  }

}
