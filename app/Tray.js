'use strict'

const {Tray} = require('electron')

module.exports = function (config) {
  const tray = new Tray(config.icon)
  tray.setToolTip(config.toolTip)
  tray.setContextMenu(config.contextMenu)
  return tray
}
