import knex from './knex'

export async function migrate () {
  let currentVersion = await knex.migrate.currentVersion()
  if (currentVersion === 'none') {
    await knex.migrate.latest()
  }
}

export async function rollback () {
  await knex.migrate.rollback()
}

export async function seed () {
  await knex.seed.run()
}

import models from './models'
export { models }
