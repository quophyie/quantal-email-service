'use strict'

const knexfile = require('./../../knexfile')
const dbconfig = process.env ? knexfile[process.env.toLowerCase()] : knexfile.development
const knex = require('knex')(dbconfig)
const db = require('bookshelf')(knex)

module.exports = db