import { contextBridge, ipcRenderer } from 'electron';
import { SetupStatus } from './services/installation.service';

export interface IAPIs {
    SelectDirectory: () => Promise<boolean>;
    SetGPTToken: (token: string) => Promise<boolean>;
    SetupChecker: () => Promise<number>;
}

const APIs: IAPIs = {
    // Installation Service Listeners
    SelectDirectory: () => ipcRenderer.invoke('selectVideosDirectory'),
    SetGPTToken: (token: string) => ipcRenderer.invoke('setGPTToken', token),
    SetupChecker: () => ipcRenderer.invoke('setupChecker')
};

contextBridge.exposeInMainWorld('API', APIs)

//Prevent Back & Next Page Buttons From Mouse
window.addEventListener("mouseup", (e) => {
    if (e.button === 3 || e.button === 4)
        e.preventDefault();
});