'use strict'

const path = require('path')
const {app, ipcMain: ipc, shell} = require('electron')
const windowStateManager = require('electron-window-state')
const Window = require('./Window')
const Tray = require('./Tray')
const ContextMenuTray = require('./menu/ContexMenuTray')
const MenuBar = require('./menu/MenuBar')
const Icon = require('./Icon')
const {productName} = require('../package.json')
require('electron-context-menu')()

const preload = path.join(__dirname, 'Browser.js')

global.appIcon = `file://${Icon.app}`

app.on('ready', () => {
  const windowState = windowStateManager()

  this.window = new Window({
    icon: Icon.app,
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
  this.tray = new Tray({icon: Icon.tray, toolTip: productName, contextMenu: this.contexMenuTray})
  this.menuBar = new MenuBar()

  this.window.loadURL('https://teams.microsoft.com')
  this.window.setMenu(this.menuBar)
  this.window.on('page-title-updated', updateTray)
  this.window.webContents.on('new-window', handleRedirect)
  windowState.manage(this.window)

  this.tray.on('click', () => {
    this.window.show()
    this.window.focus()
  })
})

ipc.on('notification-clicked', () => {
  this.window.show()
  this.window.focus()
})

const updateTray = (event, title) => {
  const count = title.match(/\d+/g) ? parseInt(title.match(/\d+/g).join('')) : 0
  if (count > 0) {
    this.tray.setImage(Icon.unread)
  } else {
    this.tray.setImage(Icon.tray)
  }
}

const handleRedirect = (event, url) => {
  if (url !== this.window.webContents.getURL()) {
    event.preventDefault()
    shell.openExternal(url)
  }
}
