'use strict'

const {Menu, Tray} = require('electron')

const template = [
  {role: 'reload'},
  {role: 'forcereload'},
  {type: 'separator'},
  {role: 'quit'}
]

module.exports = function (config = {}) {
  const contextMenu = Menu.buildFromTemplate(template)
  const tray = new Tray(config.icon)
  tray.setToolTip(config.toolTip)
  tray.setContextMenu(contextMenu)
  return tray
}
