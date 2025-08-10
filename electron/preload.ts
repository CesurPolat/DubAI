import { contextBridge, ipcRenderer } from 'electron';

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