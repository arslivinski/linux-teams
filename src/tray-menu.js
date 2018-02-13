'use strict'

const {Menu} = require('electron')

module.exports = Menu.buildFromTemplate([
  {role: 'minimize'},
  {type: 'separator'},
  {role: 'reload'},
  {role: 'forcereload'},
  {type: 'separator'},
  {role: 'quit'}
])
