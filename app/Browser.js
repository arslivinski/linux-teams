'use strict'

/* eslint-disable no-proto */
/* global Notification */

const {ipcRenderer: ipc} = require('electron')
const Constants = require('./Constants')

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
  const title = event.title || Constants.PRODUCT_NAME
  const options = {
    body: event.message,
    icon: `file://${Constants.APP_ICON}`,
    sticky: true
  }
  const notification = new Notification(title, options)
  notification.onclick = () => {
    callback && typeof callback === 'function' && callback()
    ipc.send('notification-clicked')
  }
}

function wait (checker, callback, interval = 500) {
  let timeout = setTimeout(() => {
    clearTimeout(timeout)
    if (checker()) {
      callback()
    } else {
      wait(checker, callback, interval)
    }
  }, interval)
}

document.addEventListener('DOMContentLoaded', () => {
  wait(() => !!(window.angular && window.angular.element(document.body).injector), registerNotificationsInterceptor)
})

ipc.on('page-title-updated', () => {
  if (!window.angular) return

  ipc.send('unread-messages', window.angular.element(document.body).controller().pageTitleNotificationCount)
})
