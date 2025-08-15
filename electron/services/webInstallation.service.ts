import { DownloadItem, Event, ipcMain, WebContents } from "electron";
import { ConfigService } from "./config.service";
import { exec, spawn } from "child_process";
//const { spawn } = require('child_process');

const axios = require('axios')

export class WebInstallationService {

  _webContents: WebContents;

  constructor(webContents: WebContents) {
    this._webContents = webContents;
    this.initListeners();
  }

  initListeners(): void {
    ipcMain.handle('downloadContent', (event, url: string) => this.downloadContent(url));
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

  downloadContent(url: string): void {

    exec(`"C:\\ffmpeg\\yt-dlp.exe" --print "%(extractor)s" --get-url ${url}"`, (error, stdout, stderr) => {
      if (error) {
        //console.error(`exec error: ${error}`);
        //console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    

  }

  getContentProvider(url: string): string | null {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    } else if (url.includes("twitter.com") || url.includes("twimg.com") || url.includes("x.com")) {
      return "twitter";
    } else if (url.includes("tiktok.com")) {
      return "tiktok";
    } else if (url.includes("C://") || url.includes("D://")) {
      return "local";
    } else {
      return "generic";
    }
  }

  async downloadYouTubeVideo(url: string): Promise<void> {

    const command = `"C:\\ffmpeg\\yt-dlp.exe" --print "%(extractor)s" --get-url ${url}`;
    const proc = spawn(command, { shell: true });

    proc.stdout.on('data', (data: Buffer) => {
      var output = data.toString();
      output.split('\n').forEach((line: string) => {
        if (line) {
          console.log(`stdout: ${line}`);
        }
      });
    });

    proc.stderr.on('data', (data: Buffer) => {
      console.error(`stderr: ${data}`);
      //process.stderr.write(data);
    });

    proc.on('error', (error: Error) => {
      console.error(`Error: ${error.message}`);
    });

    proc.on('close', (code: number) => {
      if (code === 0) {
        console.log('Process finished successfully.');
      } else {
        console.error(`Process exited with code ${code}`);
      }
    });

  }

  downloadTwitterVideos(url: string): void {

  }

  downloadTikTokVideo(url: string): void {

  }

  downloadLocalFile(url: string): void {
    this._webContents.downloadURL(url);
  }

  downloadUrl(url: string): void {
    this._webContents.downloadURL(url);
  }





}