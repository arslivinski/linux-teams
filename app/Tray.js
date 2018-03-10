'use strict'

const {Tray} = require('electron')
const Constants = require('./Constants')
const TrayContexMenu = require('./menu/TrayContexMenu')

module.exports = function (config) {
  const tray = new Tray(Constants.APP_ICON)

  tray.setToolTip(Constants.PRODUCT_NAME)
  tray.setContextMenu(new TrayContexMenu())

  return tray
}
