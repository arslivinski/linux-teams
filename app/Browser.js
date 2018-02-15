'use strict'

/* eslint-disable no-proto */
/* global Notification */

const {ipcRenderer: ipc} = require('electron')

/**
 * Overriding some internals to intercept notifications
 */
function registerNotificationsInterceptor () {
  const notificationsService = window.angular.element(document.body).injector().get('notificationsService')
  const showToastr = notificationsService.__proto__.showToastr
  notificationsService.__proto__.showToastr = function () {
    showToastr.apply(notificationsService, arguments)
    displayNativeNotification.apply(null, arguments)
  }
}

function displayNativeNotification (event, callback) {
  const appIcon = require('electron').remote.getGlobal('appIcon')
  const options = {
    body: event.message,
    icon: `file://${appIcon}`,
    sticky: true
  }
  const notification = new Notification(event.title, options)
  notification.onclick = () => {
    callback()
    ipc.send('notification-clicked')
  }
}

function wait (checker, callback, interval = 500) {
  let timeout = setTimeout(function () {
    clearTimeout(timeout)
    if (checker()) {
      callback()
    } else {
      wait(checker, callback, interval)
    }
  }, interval)
}

document.addEventListener('DOMContentLoaded', function () {
  wait(() => !!window.angular.element(document.body).injector, registerNotificationsInterceptor)
})
