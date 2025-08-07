

/* ipcMain.handle('get-version', () => {
  return app.getVersion()
}) */

export function isOnline() {
    return navigator.onLine;
}