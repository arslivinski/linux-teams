'use strict'

const path = require('path')
const {BrowserWindow} = require('electron')
const windowStateManager = require('electron-window-state')
const Constants = require('./Constants')
const MenuBar = require('./menu/MenuBar')

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'

module.exports = function () {
  const windowState = windowStateManager()

  const browserWindow = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: '#5458AF',
    icon: Constants.APP_ICON,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'Browser.js')
    }
  })

  browserWindow.setMenu(new MenuBar())
  browserWindow.loadURL('https://teams.microsoft.com')
  browserWindow.webContents.setUserAgent(USER_AGENT)

  windowState.manage(browserWindow)

  return browserWindow
}
