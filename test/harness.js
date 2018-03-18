import { test } from 'ava'
import start from '../server/start'
import { resolve } from 'path'
import { migrate, rollback, seed, drop } from '../server/db'

export function harness (defineTests) {
  test.before('Init server', startServer)
  test.beforeEach('Reset database', resetDatabase)
  defineTests()
  test.after.always('Kill database', drop)
}

async function startServer (t) {
  t.context = await start('localhost', 0, {
    rootDir: resolve(__dirname, '..')
  })
}

async function resetDatabase (t) {
  await rollback()
  await migrate()
  await seed()
}
