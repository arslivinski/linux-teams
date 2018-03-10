'use strict'

const {app, ipcMain: ipc, shell} = require('electron')
const Constants = require('./Constants')
const Window = require('./Window')
const Tray = require('./Tray')
require('electron-context-menu')()

const appReady = () => {
  this.window = new Window()
  this.window.on('page-title-updated', updateTray)
  this.window.webContents.on('new-window', handleRedirect)

  this.tray = new Tray()
  this.tray.on('click', trayClick)
}

const windowMinize = () => {
  this.window.minimize()
}

const windowRestore = () => {
  if (this.window) {
    this.window.show()
    this.window.focus()
  }
}

const updateTray = (event, title) => {
  const count = title.match(/\d+/g) ? parseInt(title.match(/\d+/g).join('')) : 0
  if (count > 0) {
    this.tray.setImage(Constants.UNREAD_ICON)
  } else {
    this.tray.setImage(Constants.APP_ICON)
  }
}

const trayClick = () => {
  if (!this.window.isMinimized() && this.window.isFocused()) {
    windowMinize()
  } else {
    windowRestore()
  }
}

const handleRedirect = (event, url) => {
  if (url !== this.window.webContents.getURL()) {
    event.preventDefault()
    shell.openExternal(url)
  }
}

app.makeSingleInstance(windowRestore) && app.quit()

app.on('ready', appReady)
app.on('window-all-closed', app.quit)

ipc.on('notification-clicked', windowRestore)
