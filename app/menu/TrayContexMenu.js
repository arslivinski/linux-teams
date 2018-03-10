'use strict'

const {Menu} = require('electron')

module.exports = function () {
  return Menu.buildFromTemplate([
    {role: 'quit'}
  ])
}
