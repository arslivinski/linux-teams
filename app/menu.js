"use strict";

const path = require("path");
const { app, Menu, shell } = require("electron");
const config = require("./config.js");

module.exports = Menu.buildFromTemplate([
  {
    label: "File",
    submenu: [
      {
        label: "Close",
        accelerator: "Control+W",
        click() {
          app.quit();
        },
      },
      {
        label: "Exit",
        accelerator: "Control+Q",
        click() {
          app.exit(0);
        },
      },
    ],
  },
  {
    role: "editMenu",
  },
  {
    role: "viewMenu",
  },
  {
    label: "Settings",
    submenu: [
      {
        label: "On close",
        submenu: [
          {
            label: "Exit",
            type: "radio",
            checked: config.get("onClose") === "exit",
            click() {
              config.set("onClose", "exit");
            },
          },
          {
            label: "Minimize",
            type: "radio",
            checked: config.get("onClose") === "minimize",
            click() {
              config.set("onClose", "minimize");
            },
          },
          {
            label: "Minimize to tray",
            sublabel: "The app will run in background",
            type: "radio",
            checked: config.get("onClose") === "minimizeToTray",
            click() {
              config.set("onClose", "minimizeToTray");
            },
          },
        ],
      },
      {
        label: "Always on top",
        type: "checkbox",
        checked: config.get("alwaysOnTop"),
        click() {
          config.set("alwaysOnTop", !config.get("alwaysOnTop"));
        },
      },
      {
        label: "Start minimized",
        type: "checkbox",
        checked: config.get("startMinimized"),
        click() {
          config.set("startMinimized", !config.get("startMinimized"));
        },
      },
      {
        label: "Minimize on blur",
        sublabel: "The app will be minimized when it lose focus",
        type: "checkbox",
        checked: config.get("minimizeOnBlur"),
        click() {
          config.set("minimizeOnBlur", !config.get("minimizeOnBlur"));
        },
      },
      {
        type: "separator",
      },
      {
        label: "Disable notifications",
        type: "checkbox",
        checked: config.get("disableNotifications"),
        click() {
          config.set(
            "disableNotifications",
            !config.get("disableNotifications"),
          );
        },
      },
      {
        label: "Sticky notifications",
        sublabel: "Notifications do not dismiss on timeout",
        type: "checkbox",
        checked: config.get("stickyNotifications"),
        click() {
          config.set("stickyNotifications", !config.get("stickyNotifications"));
        },
      },
      {
        type: "separator",
      },
      {
        label: "Check for updates on startup",
        sublabel: "Checked only once per day",
        type: "checkbox",
        checked: config.get("checkForUpdates"),
        click() {
          config.set("checkForUpdates", !config.get("checkForUpdates"));
        },
      },
      {
        type: "separator",
      },
      {
        label: "Restore defaults",
        click() {
          config.clear();
          app.relaunch();
          app.quit();
        },
      },
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Microsoft Teams Help",
        accelerator: "F1",
        click() {
          shell.openItem("https://support.office.com/en-us/teams");
        },
      },
      {
        label: "Linux Teams Website",
        click() {
          shell.openItem("https://github.com/arslivinski/linux-teams");
        },
      },
      {
        type: "separator",
      },
      {
        label: "Show App Data",
        click() {
          shell.openItem(app.getPath("userData"));
        },
      },
      {
        label: "Delete App Data",
        accelerator: "Control+Shift+Delete",
        click() {
          shell.moveItemToTrash(app.getPath("userData"));
          app.relaunch();
          app.quit();
        },
      },
      {
        type: "separator",
      },
      {
        label: "About",
        click() {
          app.setAboutPanelOptions({
            applicationName: "Linux Teams",
            applicationVersion: app.getVersion(),
            iconPath: path.join(__dirname, "assets", "about.png"),
            website: "https://github.com/arslivinski/linux-teams",
          });
          app.showAboutPanel();
        },
      },
    ],
  },
]);
