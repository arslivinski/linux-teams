'use strict'

const {Menu, shell} = require('electron')

const template = [
  {
    label: 'File',
    submenu: [
      {role: 'quit'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {type: 'separator'},
      {role: 'toggledevtools'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Microsoft Teams Help',
        accelerator: 'F1',
        click: () => shell.openItem('https://support.office.com/en-us/teams')
      }
    ]
  }
]

module.exports = function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  return menu
}
