import { DownloadItem, Event, ipcMain, WebContents } from "electron";
import { ConfigService } from "./config.service";
import { exec } from "child_process";
import { promisify } from "util";
import { Content } from "../DTOs/content";

const execPromise = promisify(exec);

export class WebInstallationService {

  _webContents: WebContents;

  constructor(webContents: WebContents) {
    this._webContents = webContents;
    this.initListeners();
  }

  initListeners(): void {
    ipcMain.handle('getContent', (event, url: string) => this.getContent(url));
  }

  downloadEventListener(event: Event, item: DownloadItem, webContents: WebContents): void {

    //TODO: Is still folder exist?

    const videosDirectory = (ConfigService.getVideosDirectory() || item.getSavePath()) + '/' + item.getFilename();
    item.setSavePath(videosDirectory);

    console.log("Video kaydedilecek dizin:", videosDirectory);

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download kesildi:', item.getFilename());
      }
      else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download duraklatıldı:', item.getFilename());
        }
        else {
          const receivedBytes = item.getReceivedBytes();
          const totalBytes = item.getTotalBytes();
          const progress = Math.round((receivedBytes / totalBytes) * 100);

          console.log(`Download ilerliyor: ${progress}% (${receivedBytes}/${totalBytes} bytes)`);
        }
      }
    });

    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download tamamlandı:', item.getFilename());
      } else {
        console.log('Download başarısız:', state);
      }
    });

  }

  downloadUrl(url: string): void {
    this._webContents.downloadURL(url);
  }

  async getContent(url: string): Promise<Content> {

    const { stdout } = await execPromise(`yt-dlp -J "${url}"`, {encoding:"utf-8"});

    const jsonResult: Content = JSON.parse(stdout);

    return jsonResult;

  }

  


}