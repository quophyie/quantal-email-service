'use strict'

const createError = require('create-error')
const exceptions = Object.freeze({
  MyException: createError('MyException')
})

module.exports = exceptions
