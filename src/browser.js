'use strict'

document.addEventListener('keyup', (e) => {
  if (e.ctrlKey && e.keyCode === 70) {
    // CTRL+F = Focus the "Search or type a command" input
    document.getElementById('control-input').focus()
  }
}, false)
