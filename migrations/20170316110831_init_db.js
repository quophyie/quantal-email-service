'use strict'

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments()
      table.string('username')
      table.string('password')
      table.string('first_name')
      table.string('last_name')
      table.string('gender', 1)
      table.string('email', 128)
      table.timestamp('dob')
      table.timestamp('deactived_date').defaultTo(knex.fn.now())
      table.timestamps()
      // table.timestamps(true, true)
    }),
    knex.schema.createTableIfNotExists('giphys', (table) => {
      table.increments('giphy_id')
      table.string('query').unique()
      table.string('url')
      // table.timestamps()
      table.timestamps(true, true)
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('giphys')
  ])
}
