import { contextBridge, ipcRenderer } from 'electron';
import { SetupStatus } from './services/setup.service';
import { ContentInfo } from './services/webInstallation.service';

export interface IAPIs {
    // Setup Service
    SelectDirectory: () => Promise<string>;
    SetGPTToken: (token: string) => Promise<boolean>;
    SetupChecker: () => Promise<SetupStatus>;

    // Web Installation Service
    GetContentInfo: (url: string) => Promise<ContentInfo>;
}

const APIs: IAPIs = {
    // Setup Service
    SelectDirectory: () => ipcRenderer.invoke('selectVideosDirectory'),
    SetGPTToken: (token: string) => ipcRenderer.invoke('setGPTToken', token),
    SetupChecker: () => ipcRenderer.invoke('setupChecker'),

    // Web Installation Service
    GetContentInfo: (url: string) => ipcRenderer.invoke('getContentInfo', url)
};

contextBridge.exposeInMainWorld('API', APIs)

//Prevent Back & Next Page Buttons From Mouse
window.addEventListener("mouseup", (e) => {
    if (e.button === 3 || e.button === 4)
        e.preventDefault();
});