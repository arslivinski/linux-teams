'use strict'

const path = require('path')

const ICON_DIR = path.join(__dirname, '..', 'assets')

module.exports = {
  app: path.join(ICON_DIR, 'icon.png'),
  tray: path.join(ICON_DIR, 'tray.png'),
  unread: path.join(ICON_DIR, 'unread.png')
}
