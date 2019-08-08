"use strict";

const path = require("path");
const { app, ipcMain, Menu, Tray } = require("electron");
const config = require("./config.js");
const Window = require("./window.js");
const menu = require("./menu.js");
const { checkForUpdateAndNotify } = require("./updater.js");

const ASSETS_DIR = path.join(__dirname, "assets");

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let window;
let tray;
let contextMenu;

function createWindow() {
  window = new Window();

  window.setIcon(path.join(ASSETS_DIR, "icon.png"));

  window.on("closed", () => {
    window = null;
  });
}

function createTrayContextMenu() {
  contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Linux Teams",
      click() {
        focusWindow();
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
        config.set("disableNotifications", !config.get("disableNotifications"));
      },
    },
    {
      type: "separator",
    },
    {
      label: "Exit Linux Teams",
      click() {
        app.exit(0);
      },
    },
  ]);
}

function createTray() {
  tray = new Tray(path.join(ASSETS_DIR, "icon.png"));
  tray.setToolTip("Linux Teams");
  tray.setContextMenu(contextMenu);
}

function focusWindow() {
  if (window != null) {
    if (window.isMinimized()) {
      window.restore();
    }
    window.show();
  }
}

function updateBadge(count) {
  if (app.isUnityRunning()) {
    app.setBadgeCount(count);
  }
}

function updateTray(count) {
  let trayIcon;

  if (count === 0) {
    trayIcon = path.join(ASSETS_DIR, "icon.png");
  } else if (count >= 1 && count <= 9) {
    trayIcon = path.join(ASSETS_DIR, `tray-unread-${count}.png`);
  } else {
    trayIcon = path.join(ASSETS_DIR, "tray-unread-9plus.png");
  }

  tray.setImage(trayIcon);
}

app.on("ready", () => {
  Menu.setApplicationMenu(menu);
  createWindow();
  createTrayContextMenu();
  createTray();
  checkForUpdateAndNotify();
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("second-instance", () => {
  focusWindow();
});

ipcMain.on("unread-messages", (event, count) => {
  updateBadge(count);
  updateTray(count);
  window.flashFrame(count > 0 && !window.isFocused());
});

ipcMain.on("notification-clicked", () => {
  focusWindow();
});

ipcMain.on("conectivity-changed", (event, isOnline, wasOnline) => {
  if (isOnline && !wasOnline) {
    window.reload();
  }
});

config.onDidChange("disableNotifications", isDisabled => {
  menu.items[3].submenu.items[5].checked = isDisabled;
  contextMenu.items[2].checked = isDisabled;
  tray.setContextMenu(contextMenu);
});
