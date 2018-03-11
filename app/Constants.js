'use strict'

const path = require('path')
const {productName} = require('../package.json')

module.exports = {
  PRODUCT_NAME: productName,
  APP_ICON: path.join(__dirname, '..', 'assets', 'linux-teams.png'),
  APP_ICON_UNREAD_1: path.join(__dirname, '..', 'assets', 'linux-teams-unread-1.png'),
  APP_ICON_UNREAD_2: path.join(__dirname, '..', 'assets', 'linux-teams-unread-2.png'),
  APP_ICON_UNREAD_3: path.join(__dirname, '..', 'assets', 'linux-teams-unread-3.png'),
  APP_ICON_UNREAD_4: path.join(__dirname, '..', 'assets', 'linux-teams-unread-4.png'),
  APP_ICON_UNREAD_5: path.join(__dirname, '..', 'assets', 'linux-teams-unread-5.png'),
  APP_ICON_UNREAD_6: path.join(__dirname, '..', 'assets', 'linux-teams-unread-6.png'),
  APP_ICON_UNREAD_7: path.join(__dirname, '..', 'assets', 'linux-teams-unread-7.png'),
  APP_ICON_UNREAD_8: path.join(__dirname, '..', 'assets', 'linux-teams-unread-8.png'),
  APP_ICON_UNREAD_9: path.join(__dirname, '..', 'assets', 'linux-teams-unread-9.png'),
  APP_ICON_UNREAD_9_PLUS: path.join(__dirname, '..', 'assets', 'linux-teams-unread-9plus.png')
}
