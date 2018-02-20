'use strict'

const createError = require('create-error')
const CommonErrors = require('quantal-errors')
let exceptions = {
  InvalidTokenException: createError('InvalidTokenException')
}
Object.assign(exceptions, CommonErrors)

module.exports = Object.freeze(exceptions)
