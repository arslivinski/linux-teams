'use strict'

const path = require('path')
const {Menu} = require('electron')
const aboutWindow = require('electron-about-window').default
const open = require('open')

module.exports = Menu.buildFromTemplate([
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
        label: 'Online Documentation',
        accelerator: 'F1',
        click: () => open('https://support.office.com/en-us/teams')
      },
      {type: 'separator'},
      {
        label: 'About',
        click () {
          aboutWindow({
            icon_path: path.join(__dirname, '..', 'assets', 'icons', '256x256.png'),
            copyright: `Copyright (c) 2018 Anderson Slivinski <hr /> Microsoft, Microsoft Teams, Microsoft Teams logo are either registered trademarks or trademarks of Microsoft Corporation in the United States and/or other countries.`,
            use_inner_html: true,
            adjust_window_size: true,
            win_options: false
          })
        }
      }
    ]
  }
])
