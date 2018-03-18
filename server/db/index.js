import knex from './knex'

export async function migrate () {
  await knex.migrate.latest()
}

export async function rollback () {
  await knex.migrate.rollback()
}

export async function seed () {
  await knex.seed.run()
}

import * as models from './models'
export { models }
