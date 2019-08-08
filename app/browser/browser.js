"use strict";

const { ipcRenderer } = require("electron");
const Notify = require("./notify.js");

function get(getter) {
  return new Promise(resolve => {
    function wait() {
      const value = getter();
      if (value == null) {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          wait();
        }, 200);
      } else {
        resolve(value);
      }
    }
    wait();
  });
}

async function overrideNotify() {
  await get(() => window.Notify);
  window.Notify = Notify;
}

function subscriteOnConectivityEvents() {
  let prevStatus = navigator.onLine;

  function handleConectivityChange() {
    ipcRenderer.send("conectivity-changed", navigator.onLine, prevStatus);
  }

  window.addEventListener("online", handleConectivityChange);
  window.addEventListener("offline", handleConectivityChange);

  handleConectivityChange();
}

document.addEventListener("DOMContentLoaded", () => {
  overrideNotify();
  subscriteOnConectivityEvents();
});

ipcRenderer.on("page-title-updated", () => {
  if (window.angular) {
    const controller = window.angular.element(document.body).controller();
    const count = controller.pageTitleNotificationCount;
    ipcRenderer.send("unread-messages", count);
  }
});
