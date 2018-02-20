'use strict'

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('template_info', (table) => {
      table.increments()
      table.string('name')
      table.string('to')
      table.string('from')
      table.string('subject')
      // table.timestamps(true, true)
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('template_info')
  ])
}
