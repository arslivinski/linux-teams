'use strict'

const {app, ipcMain: ipc, shell} = require('electron')
const Constants = require('./Constants')
const Window = require('./Window')
const Tray = require('./Tray')
require('electron-context-menu')()

const appReady = () => {
  this.window = new Window()
  this.window.on('focus', windowFocus)
  this.window.on('page-title-updated', titleChanged)
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

const windowFocus = () => {
  this.window.flashFrame(false)
}

const titleChanged = () => {
  this.window.webContents.send('page-title-updated')
}

const updateCounters = (event, count) => {
  console.log('updateCounters', count)
  updateTray(count)
  updateBadge(count)

  if (count > 0 && !this.window.isFocused()) {
    this.window.flashFrame(true)
  }
}

const updateTray = (count) => {
  if (count >= 1 && count <= 9) {
    this.tray.setImage(Constants[`APP_ICON_UNREAD_${count}`])
  } else if (count > 9) {
    this.tray.setImage(Constants.APP_ICON_UNREAD_9_PLUS)
  } else {
    this.tray.setImage(Constants.APP_ICON)
  }
}

const updateBadge = (count) => {
  if (app.isUnityRunning()) {
    app.setBadgeCount(count)
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
ipc.on('unread-messages', updateCounters)
