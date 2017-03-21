'use strict'
const bookshelf = require('./../../db')
const BaseModel = require('quantal-base-model')(bookshelf)

const Giphy = BaseModel.extend({
  tableName: 'giphys',
  idAttribute: 'giphy_id'
  // validation is passed to Joi.object(), so use a raw object
  /* validate: {
    query: Joi.string()
   } */
})

module.exports = bookshelf.model('Giphy', Giphy)
