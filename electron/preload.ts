import { contextBridge, ipcRenderer } from 'electron';
import { SetupStatus } from './services/setup.service';
import { ContentInfo } from './services/webInstallation.service';

export interface IAPIs {
    SelectDirectory: () => Promise<boolean>;
    SetGPTToken: (token: string) => Promise<boolean>;
    SetupChecker: () => Promise<number>;

    DownloadContent: (url: string) => Promise<ContentInfo | undefined>;
}

const APIs: IAPIs = {
    // Setup Service
    SelectDirectory: () => ipcRenderer.invoke('selectVideosDirectory'),
    SetGPTToken: (token: string) => ipcRenderer.invoke('setGPTToken', token),
    SetupChecker: () => ipcRenderer.invoke('setupChecker'),

    // Web Installation Service
    DownloadContent: (url: string) => ipcRenderer.invoke('downloadContent', url)
};

contextBridge.exposeInMainWorld('API', APIs)

//Prevent Back & Next Page Buttons From Mouse
window.addEventListener("mouseup", (e) => {
    if (e.button === 3 || e.button === 4)
        e.preventDefault();
});