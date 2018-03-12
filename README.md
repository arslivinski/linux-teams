<img src="linux-teams.svg" alt="Logo" width="128" height="128">

# Linux Teams
Linux Teams is an unofficial Microsoft Teams application for Linux.

## Why?
At the date of the creation of this project, Microsoft didn't provide a Linux application for Teams. Besides that, the notification on the Web Application is very limited.

This project aims to solve both of this problems wrapping the Web Application on a native application using Electron and implementing some fixes to provide better notifications.

## Installing

### Fedora
```
$ sudo dnf install -y linux-teams-1.3.0.x86_64.rpm
```

### Ubuntu
```
$ sudo apt-get install -y linux-teams_1.3.0_amd64.deb
```

### Other
```
$ tar -zxvf linux-teams-1.3.0.tar.gz
$ cd linux-teams-1.3.0
$ ./LinuxTeams
```

### Running from source
You will need Git and npm to run this application.

```
$ git clone https://github.com/arslivinski/linux-teams.git
$ cd linux-teams
$ npm install
$ npm start
```

As the focus here is to create a Linux application, I'm not testing against other operational systems like Windows or macOS. However, should be no problem to run this application on these OS.

## Licence
This project is licensed under the terms of the MIT license.

Microsoft, Microsoft Teams, Microsoft Teams logo are either registered trademarks or trademarks of Microsoft Corporation in the United States and/or other countries.

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
