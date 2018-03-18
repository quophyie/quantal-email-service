
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('template_info').del()
    .then(() => {
      // Inserts seed entries
      return knex('template_info').insert([
        {name: 'new_user', from: 'admin@quantallhs.com', subject: 'Welcome to Quantal LHS'},
        {name: 'password_reset', from: 'admin@quantallhs.com', subject: 'Password Reset Request Email'}
      ])
    })
}
