import { DownloadItem, Event, ipcMain, WebContents } from "electron";
import { ConfigService } from "./config.service";
import { exec, execFile, spawn } from "child_process";
import { promisify } from "util";

const execFilePromise = promisify(execFile);

export interface ContentInfo {
  platform: string;
  title: string;
  duration: string;
  mediaUrls: string[];
}

export class WebInstallationService {

  _webContents: WebContents;

  constructor(webContents: WebContents) {
    this._webContents = webContents;
    this.initListeners();
  }

  initListeners(): void {
    ipcMain.handle('downloadContent', (event, url: string) => this.getContentInfo(url));
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

    /*

    const desktopPath = path.join(os.homedir(), 'Desktop');
        
        // API'den gelen custom filename'i kullan, yoksa varsayılan filename'i al
        let filename;
        if (customFileName) {
          filename = customFileName;
          customFileName = null; // Kullandıktan sonra temizle
        } else {
          filename = item.getFilename();
        }
        
        const safeName = filename.replace(/[<>:"/\\|?*]/g, '_');
        
        // Masaüstüne kaydet
        const savePath = path.join(desktopPath, safeName);
        item.setSavePath(savePath);
    
        console.log('Download başladı:', safeName);
        console.log('Kaydedilecek konum:', savePath);
    
        // İndirme ilerlemesini UI'ya gönder (win.webContents kullan)
        item.on('updated', (event, state) => {
          if (state === 'interrupted') {
            console.log('Download kesildi');
            win.webContents.send('download-progress', { 
              state: 'interrupted', 
              filename: safeName 
            });
          } else if (state === 'progressing') {
            if (item.isPaused()) {
              console.log('Download duraklatıldı');
              win.webContents.send('download-progress', { 
                state: 'paused', 
                filename: safeName 
              });
            } else {
              const receivedBytes = item.getReceivedBytes();
              const totalBytes = item.getTotalBytes();
              const progress = Math.round((receivedBytes / totalBytes) * 100);
              
              console.log(`Download progress: ${progress}% (${receivedBytes}/${totalBytes} bytes)`);
              win.webContents.send('download-progress', { 
                state: 'progressing', 
                progress: progress,
                receivedBytes: receivedBytes,
                totalBytes: totalBytes,
                filename: safeName 
              });
            }
          }
        });
    
        item.once('done', (event, state) => {
          if (state === 'completed') {
            console.log('Download tamamlandı:', safeName);
            win.webContents.send('download-progress', { 
              state: 'completed', 
              filename: safeName,
              savePath: savePath 
            });
          } else {
            console.log('Download başarısız:', state);
            win.webContents.send('download-progress', { 
              state: 'failed', 
              filename: safeName,
              error: state 
            });
          }
        });

    */



  }

  async getContentInfo(url: string): Promise<ContentInfo> {

    let platform: any;
    let title: any;
    let duration: any;
    let urls: any[] = [];

    const { stdout } = await execFilePromise(`C:\\ffmpeg\\yt-dlp.exe`, [`--print`, `%(extractor)s;%(title)s;%(duration_string)s`, `--no-playlist`, `--get-url`, url]);

    const consoleOutputs = stdout.split('\n');
    [platform, title, duration] = consoleOutputs[0].split(';');
    urls = consoleOutputs.slice(1).map(line => line.trim()).filter(line => line);

    //console.log(`Platform: ${platform}`);
    console.log(`Title: ${title}`);
    //console.log(`Duration: ${duration}`);
    //console.log(`URLs: ${urls.join(', ')}`);

    return {
      platform,
      title,
      duration,
      mediaUrls: urls
    };

  }

  downloadUrl(url: string): void {
    this._webContents.downloadURL(url);
  }


}