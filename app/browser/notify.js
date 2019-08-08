"use strict";

const { ipcRenderer } = require("electron");
const config = require("../config.js");

/**
 * Rewrite of minified Notify class on MS Teams, which looks to be notifyjs
 * https://github.com/alexgibson/notify.js
 */
module.exports = class Notify {
  static get isSupported() {
    return "Notification" in window;
  }

  static get needsPermission() {
    return !Notify.isSupported || Notification.permission !== "granted";
  }

  static get permissionLevel() {
    return Notify.isSupported ? Notification.permission : null;
  }

  static requestPermission(onPermissionGranted, onPermissionDenied) {
    if (Notify.isSupported) {
      Notification.requestPermission(permission => {
        if (
          permission === "granted" &&
          typeof onPermissionGranted === "function"
        ) {
          onPermissionGranted();
        } else if (typeof onPermissionGranted === "function") {
          onPermissionDenied();
        }
      });
    }
  }

  /**
   * @param {string} title
   * @param {Object} options
   */
  constructor(title, options = {}) {
    if (typeof title !== "string") {
      throw new TypeError(
        `Expected "title" to be a string but received "${typeof title}" instead`,
      );
    }

    this.title = title;
    this.options = options;
  }

  show() {
    if (Notify.isSupported && !config.get("disableNotifications")) {
      this.notification = new Notification(this.title, {
        body: this.options.body,
        tag: this.options.tag,
        icon: this.options.icon,
      });

      if (!config.get("stickyNotifications") && !isNaN(this.options.timeout)) {
        setTimeout(this.close.bind(this), 1e3 * this.options.timeout);
      }

      this.notification.addEventListener("show", this);
      this.notification.addEventListener("error", this);
      this.notification.addEventListener("close", this);
      this.notification.addEventListener("click", this);
    }
  }

  close() {
    this.notification.close();
  }

  destroy() {
    this.notification.removeEventListener("show", this);
    this.notification.removeEventListener("error", this);
    this.notification.removeEventListener("close", this);
    this.notification.removeEventListener("click", this);
  }

  handleShowNotification(event) {
    if (typeof this.options.notifyShow === "function") {
      this.options.notifyShow(event);
    }
  }

  handleCloseNotification(event) {
    if (typeof this.options.notifyClose === "function") {
      this.options.notifyClose(event);
    }
    this.destroy();
  }

  handleClickNotification(event) {
    ipcRenderer.send("notification-clicked");
    if (typeof this.options.notifyClick === "function") {
      this.options.notifyClick(event);
    }
  }

  handleErrorNotification(event) {
    if (typeof this.options.notifyError === "function") {
      this.options.notifyError(event);
    }
    this.destroy();
  }

  handleEvent(event) {
    switch (event.type) {
      case "show":
        this.handleShowNotification(event);
        break;
      case "close":
        this.handleCloseNotification(event);
        break;
      case "click":
        this.handleClickNotification(event);
        break;
      case "error":
        this.handleErrorNotification(event);
    }
  }
};
