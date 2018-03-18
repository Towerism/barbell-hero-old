export function seed (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { id: 1, username: 'admin', password: 'asdf', password_digest: 'fdsa' }
      ])
    })
}
