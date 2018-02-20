/**
 * Created by dman on 05/10/2017.
 */
'use strict'

const CommonEvents = require('quantal-nodejs-shared').events

const events = Object.assign({}, CommonEvents, {
  EMAIL_TEMPLATE_RETRIEVE: 'EMAIL_TEMPLATE_RETRIEVE'
})

module.exports = Object.freeze(events)
