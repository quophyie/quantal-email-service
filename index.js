'use strict'

const startupConfig = new (require('./app/config'))()

module.exports = startupConfig.getApp()
