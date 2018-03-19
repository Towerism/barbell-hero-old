import { test } from 'ava'
import start from '../server/start'
import { resolve } from 'path'
import { migrate, seed, rollback, drop } from '../server/db'
import Mutex from 'await-mutex'
import request from './helpers/request'

let mutex = new Mutex()
let unlock

export function harness (defineTests) {
  test.serial.before('Init server', startServer)
  test.serial.before('Init request', initRequest)
  test.beforeEach('Init database', initDatabase)

  defineTests()

  test.afterEach.always('Rollback database', rollbackDatabase)
  test.after.always('Kill database', drop)
}

function initRequest (t) {
  t.context.api = request(t)
}

async function startServer (t) {
  t.context = await start('localhost', 0, {
    rootDir: resolve(__dirname, '..')
  })
}

async function initDatabase (t) {
  unlock = await mutex.lock()
  await migrate()
  await seed()
}

async function rollbackDatabase (t) {
  await rollback()
  unlock()
}
