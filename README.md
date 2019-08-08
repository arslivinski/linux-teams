<img src="linux-teams.svg" alt="Logo" width="128" height="128">

# Linux Teams

Linux Teams is an unofficial Electron-based Microsoft Teams application for Linux, because there's no official version, [yet](https://microsoftteams.uservoice.com/forums/555103-public/suggestions/16911565-linux-client).

This client has the following features:

- Taskbar and tray icon with unread count badge
- Background execution
- Option to start minimized
- Minimize on close
- Always on top
- Notifications that not expires on timout
- Clickable notifications
- Ability to disable notifications

...and other configurable things.

I don't have plans to make this client feature-complete with things like voice/video calls and screen share, just because I don't use them. If you really need those features, I recommend you to check out [this](https://github.com/IsmaelMartinez/teams-for-linux) other client. However, I'm open to contributions! 😀️

As I built this client for my needs, I've tested it only on my setup, which is currently Ubuntu 19.04 with GNOME. If you are having trouble with another distro or DE, let me know.

## Installing

### Ubuntu

```sh
sudo dpkg -i linux-teams_2.0.0_amd64.deb && sudo apt install -yf
```

### Fedora

```sh
sudo dnf install -y linux-teams-2.0.0.x86_64.rpm
```

### AppImage

```sh
chmod +x linux-teams-2.0.0.AppImage
./linux-teams-2.0.0.AppImage
```

### Other

```sh
tar -zxf linux-teams-2.0.0.tar.gz
cd linux-teams-2.0.0
./linux-teams
```

### Running from source

```sh
git clone https://github.com/arslivinski/linux-teams.git
cd linux-teams
npm install
npm start
```

## Troubleshooting

### Blank screen when launching the application

When you launch the application, you get stuck on a blank screen with the title "Microsoft Teams - initializing...". This maybe occurs after a release of a new version by Microsoft. I couldn't find a solution for this yet, so for now you can workarround this by force-reloading the application. To force-reload, open the menu by pressing `Alt` and click on the option "View" > "Force Reload", or use the keyboard shortcut `Ctrl+Shift+R`.

### Some weird and crazy behaviour

Just clear the app data. You will lose your settings, but probably will fix the problem. Open the menu by pressing `Alt` and click on the option "Help" > "Delete App Data", or use the keyboard shortcut `Ctrl+Shift+Del`.

## Licence

This project is licensed under the terms of the MIT license.

Microsoft, Microsoft Teams, Microsoft Teams logo are either registered trademarks or trademarks of Microsoft Corporation in the United States and/or other countries.
