import knex from './knex'
import del from 'del'
import { resolve, join } from 'path'

export async function migrate () {
  await knex.migrate.latest()
}

export async function rollback () {
  await knex.migrate.rollback()
}

export async function seed () {
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
