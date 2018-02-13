'use strict'

const {app} = require('electron')
const Window = require('./Window')
const Menu = require('./Menu')
const Tray = require('./Tray')
const Icon = require('./Icon')
const {productName} = require('../package.json')

app.on('ready', () => {
  this.window = new Window({icon: Icon.app})
  this.menu = new Menu()
  this.tray = new Tray({icon: Icon.tray, toolTip: productName})

  this.tray.on('click', () => {
    this.window.show()
    this.window.focus()
  })
})
