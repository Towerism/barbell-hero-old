import { test } from 'ava'
import start from '../server/start'
import { resolve } from 'path'
import { migrate, rollback, seed } from '../server/db'

export function ensureServerIsStartedFresh () {
  test.before('Init server', startServer)
  test.beforeEach('Reset database', resetDatabase)
}

async function startServer (t) {
  t.context = await start('localhost', 4000, {
    rootDir: resolve(__dirname, '..')
  })
}

async function resetDatabase (t) {
  await rollback()
  await migrate()
  await seed()
}
