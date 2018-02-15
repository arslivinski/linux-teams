'use strict'

const path = require('path')
const {app, ipcMain: ipc} = require('electron')
const windowStateManager = require('electron-window-state')
const Window = require('./Window')
const Tray = require('./Tray')
const ContextMenuTray = require('./menu/ContexMenuTray')
const MenuBar = require('./menu/MenuBar')
const Icon = require('./Icon')
const {productName} = require('../package.json')

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
