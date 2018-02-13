'use strict'

const {BrowserWindow} = require('electron')

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'

module.exports = function (config = {}) {
  const browserWindow = new BrowserWindow({
    icon: config.icon,
    backgroundColor: '#5458AF',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  })

  browserWindow.loadURL('https://teams.microsoft.com', {userAgent: USER_AGENT})

  return browserWindow
}
