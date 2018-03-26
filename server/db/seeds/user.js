import getModels from '../getModels'

export async function seed (knex, Promise) {
  // Deletes ALL existing entries
  await knex('user').del()

  // Save seed user
  let { User } = getModels(knex)
  let user = new User({ username: 'admin', password: 'password' })
  return user.save()
}
