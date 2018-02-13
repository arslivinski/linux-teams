# <img src="linux-teams.svg" alt="Logo" width="128" height="128"> Linux Teams
Linux Teams is an unofficial Microsoft Teams application for Linux.

## Why?
At the date of the creation of this project, Microsoft didn't provide a Linux application for Teams. Besides that, the notification on the Web Application is very limited.

This project aims to solve both of this problems wrapping the Web Application on a native application using Electron and implementing some fixes to provide better notifications.

## Installing
This project is at early stage, so I'm not providing any installer until there's something useful. Until then, you may [run this application from source](#running-from-source).

### Running from source
You will need Git and npm to run this application.

```
$ git clone https://github.com/arslivinski/linux-teams.git
$ cd linux-teams
$ npm install
$ npm start
```

As the focus here is to create a Linux application, I'm not testing against other operational systems like Windows or macOS. However, should be no problem to run this application on these OS.

## TODO
  - [x] <del>Set the application name</del>
  - [x] <del>Set an icon</del>
  - [ ] Create a custom menu
  - [ ] Tray icon
  - [ ] Make tray icon clickable
  - [ ] Display native notifications
  - [ ] Make notifications clickable
  - [ ] Create hotkeys
  - [ ] Manage window size correctly
  - [ ] Context menu
  - [ ] Release Linux packages
  - [ ] Add auto-update

## Licence
This project is licensed under the terms of the MIT license.

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
