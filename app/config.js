"use strict";

const Store = require("electron-store");

module.exports = new Store({
  schema: {
    onClose: {
      enum: ["exit", "minimize", "minimizeToTray"],
      default: "exit",
    },
    startMinimized: {
      type: "boolean",
      default: false,
    },
    alwaysOnTop: {
      type: "boolean",
      default: false,
    },
    minimizeOnBlur: {
      type: "boolean",
      default: false,
    },
    stickyNotifications: {
      type: "boolean",
      default: false,
    },
    disableNotifications: {
      type: "boolean",
      default: false,
    },
    checkForUpdates: {
      type: "boolean",
      default: true,
    },
    lastUpdateCheck: {
      type: "number",
      default: Date.now(),
    },
  },
});
