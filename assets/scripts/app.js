'use strict'

const storage = require('./storage.js')

$(() => {
  storage.loadList()
  storage.addHandlers()
})
