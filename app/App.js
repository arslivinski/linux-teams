'use strict'

const path = require('path')
const {app, ipcMain: ipc, shell} = require('electron')
const windowStateManager = require('electron-window-state')
const Window = require('./Window')
const Tray = require('./Tray')
const ContextMenuTray = require('./menu/ContexMenuTray')
const MenuBar = require('./menu/MenuBar')
const {productName} = require('../package.json')
require('electron-context-menu')()

const preload = path.join(__dirname, 'Browser.js')

global.appIcon = path.join(__dirname, '..', 'assets', 'app.png')
global.unreadIcon = path.join(__dirname, '..', 'assets', 'unread.png')

const isSecondInstance = app.makeSingleInstance(() => {
  if (this.window) {
    if (this.window.isMinimized()) {
      this.window.show()
    }
    this.window.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

app.on('ready', () => {
  const windowState = windowStateManager()

  this.window = new Window({
    icon: global.appIcon,
    backgroundColor: '#5458AF',
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    webPreferences: {
      preload
    }
  })

  this.contexMenuTray = new ContextMenuTray()
  this.tray = new Tray({icon: global.appIcon, toolTip: productName, contextMenu: this.contexMenuTray})
  this.menuBar = new MenuBar()

  this.window.loadURL('https://teams.microsoft.com')
  this.window.setMenu(this.menuBar)
  this.window.on('page-title-updated', updateTray)
  this.window.webContents.on('new-window', handleRedirect)
  windowState.manage(this.window)

  this.tray.on('click', () => {
    if (!this.window.isMinimized() && this.window.isFocused()) {
      this.window.minimize()
    } else {
      this.window.show()
      this.window.focus()
    }
  })
})

app.on('window-all-closed', app.quit)

ipc.on('notification-clicked', () => {
  this.window.show()
  this.window.focus()
})

const updateTray = (event, title) => {
  const count = title.match(/\d+/g) ? parseInt(title.match(/\d+/g).join('')) : 0
  if (count > 0) {
    this.tray.setImage(global.unreadIcon)
  } else {
    this.tray.setImage(global.appIcon)
  }
}

const handleRedirect = (event, url) => {
  if (url !== this.window.webContents.getURL()) {
    event.preventDefault()
    shell.openExternal(url)
  }
}
