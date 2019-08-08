"use strict";

const https = require("https");
const path = require("path");
const { app, shell, BrowserWindow } = require("electron");
const semver = require("semver");
const config = require("./config.js");

const REPOSITORY = "arslivinski/linux-teams";
const URL = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;

function checkForUpdate() {
  return new Promise((resolve, reject) => {
    const lastUpdateCheck = config.get("lastUpdateCheck");
    const day = 1000 * 60 * 60 * 24;

    if (lastUpdateCheck != null && Date.now() - lastUpdateCheck <= day) {
      return false;
    }

    const options = {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Electron",
      },
    };

    https
      .get(URL, options, response => {
        let data = "";

        response.on("data", chunk => {
          data += chunk.toString("utf8");
        });

        response.on("end", () => {
          const release = JSON.parse(data);
          config.set("lastUpdateCheck", Date.now());
          resolve(semver.lt(app.getVersion(), release.name));
        });
      })
      .on("error", reject);
  });
}

function notify() {
  const window = new BrowserWindow({
    icon: path.join(__dirname, "assets", "icon.png"),
    width: 320,
    height: 180,
    parent: BrowserWindow.getAllWindows()[0],
    modal: true,
    show: false,
    resizable: false,
    minimizable: false,
    closable: false,
    fullscreenable: false,
  });

  window.setMenuBarVisibility(false);

  window.once("ready-to-show", () => {
    window.show();
  });

  window.webContents.on("new-window", (event, url) => {
    if (url !== window.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
      window.destroy();
    }
  });

  window.loadURL(`file://${__dirname}/assets/update.html`);
}

module.exports.checkForUpdateAndNotify = async () => {
  try {
    if (config.get("checkForUpdates") && (await checkForUpdate())) {
      notify();
    }
  } catch (error) {
    console.error(error);
  }
};
