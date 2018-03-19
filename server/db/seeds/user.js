export async function seed (knex, Promise) {
  // Deletes ALL existing entries
  await knex('user').del()
  // Inserts seed entries
  return knex('user').insert([
    { id: 1, username: 'admin', password: 'asdf' }
  ])
}
