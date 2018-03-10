'use strict'

const path = require('path')
const {productName} = require('../package.json')

module.exports = {
  PRODUCT_NAME: productName,
  APP_ICON: path.join(__dirname, '..', 'assets', 'app.png'),
  UNREAD_ICON: path.join(__dirname, '..', 'assets', 'unread.png')
}
