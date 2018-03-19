import knex from './knex'
import del from 'del'
import { resolve, join } from 'path'

export async function migrate () {
  console.log(`${process.pid}: migrating database`)
  let currentVersion = await knex.migrate.currentVersion()
  if (currentVersion === 'none') {
    await knex.migrate.latest()
  }
}

export async function rollback () {
  console.log(`${process.pid}: rolling back database`)
  await knex.migrate.rollback()
}

export async function seed () {
  console.log(`${process.pid}: seeding database`)
  await knex.seed.run()
}

/* only does anything when connected to a test database */
export async function drop () {
  knex.destroy()
  let root = resolve(__dirname, '../..')
  let testdbs = join(root, 'testdb*.sqlite')
  await del([testdbs])
}

import * as models from './models'
export { models }
