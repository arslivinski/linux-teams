'use strict'

const {BrowserWindow} = require('electron')
const merge = require('lodash.merge')

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'

module.exports = function (config) {
  const browserWindow = new BrowserWindow(merge({
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  }, config))

  browserWindow.webContents.setUserAgent(USER_AGENT)

  return browserWindow
}
