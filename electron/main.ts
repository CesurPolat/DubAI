import { ipcMain, app, BrowserWindow, IpcMain, dialog } from 'electron';
const path = require('node:path')

import { InstallationService } from './services/installation.service';

const installationService = new InstallationService();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setMenuBarVisibility(false)

  win.webContents.openDevTools()

  win.loadURL('http://localhost:4200/welcome')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
