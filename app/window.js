"use strict";

const path = require("path");
const { shell, BrowserWindow } = require("electron");
const contextMenu = require("electron-context-menu");
const windowStateManager = require("electron-window-state");
const config = require("./config.js");

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.102 Safari/537.36";

module.exports = function Window() {
  const windowState = windowStateManager();

  const window = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: "#fff",
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    show: false,
    skipTaskbar:
      config.get("startMinimized") &&
      config.get("onClose") === "minimizeToTray",
    alwaysOnTop: config.get("alwaysOnTop"),
    webPreferences: {
      partition: "persist:linux-teams",
      preload: path.join(__dirname, "browser", "browser.js"),
      nodeIntegration: false,
      defaultFontFamily: "sans-serif",
    },
  });

  contextMenu({ window });

  windowState.manage(window);

  window.webContents.setUserAgent(USER_AGENT);
  window.webContents.on("new-window", (event, url) => {
    if (url !== window.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  window.once("ready-to-show", () => {
    if (config.get("startMinimized")) {
      window.minimize();
    } else {
      window.show();
    }
  });

  window.on("show", () => {
    window.setSkipTaskbar(false);
  });

  window.on("focus", () => {
    window.flashFrame(false);
  });

  window.on("blur", () => {
    if (config.get("minimizeOnBlur")) {
      window.minimize();
    }
  });

  window.on("close", event => {
    if (config.get("onClose") === "minimize") {
      event.preventDefault();
      window.minimize();
    } else if (config.get("onClose") === "minimizeToTray") {
      event.preventDefault();
      window.hide();
      window.setSkipTaskbar(true);
    }
  });

  window.on("page-title-updated", () => {
    window.webContents.send("page-title-updated");
  });

  config.onDidChange("alwaysOnTop", alwaysOnTop => {
    window.setAlwaysOnTop(alwaysOnTop);
  });

  window.loadURL("https://teams.microsoft.com");

  return window;
};
