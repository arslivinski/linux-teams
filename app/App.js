'use strict'

const path = require('path')
const {app} = require('electron')
const Window = require('./Window')
const Tray = require('./Tray')
const ContextMenuTray = require('./menu/ContexMenuTray')
const MenuBar = require('./menu/MenuBar')
const Icon = require('./Icon')
const {productName} = require('../package.json')

const preload = path.join(__dirname, 'Browser.js')

app.on('ready', () => {
  this.window = new Window({icon: Icon.app, backgroundColor: '#5458AF', webPreferences: {preload}})
  this.contexMenuTray = new ContextMenuTray()
  this.tray = new Tray({icon: Icon.tray, toolTip: productName, contextMenu: this.contexMenuTray})
  this.menuBar = new MenuBar()

  this.window.loadURL('https://teams.microsoft.com')
  this.window.setMenu(this.menuBar)

  this.tray.on('click', () => {
    this.window.show()
    this.window.focus()
  })
})
