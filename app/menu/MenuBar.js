'use strict'

const {Menu, shell} = require('electron')

module.exports = function () {
  return Menu.buildFromTemplate([
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
      role: 'help',
      submenu: [
        {
          label: 'Microsoft Teams Help',
          accelerator: 'F1',
          click: () => shell.openItem('https://support.office.com/en-us/teams')
        },
        {type: 'separator'},
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'}
      ]
    }
  ])
}
