'use strict'

/* eslint-disable no-proto */

document.addEventListener('DOMContentLoaded', function () {
  // enableNativeNotifications()
})

/**
 * Overriding some internals to enable native notifications
 */
function enableNativeNotifications () {
  const notificationsService = window.angular.element(document.body).injector().get('notificationsService')
  notificationsService.askForPermission()
  notificationsService.teamsIconUrl = window.jQuery('*[rel="shortcut icon"]').get(0).getAttribute('href')
  notificationsService.__proto__.getProfileIcon = function (e) { return this.teamsIconUrl || e }
  notificationsService.__proto__.shouldShowOnDesktop = function () { return true }
}
