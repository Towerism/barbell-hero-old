import { test } from 'ava'
import start from '../server/start'
import { resolve } from 'path'
import { migrate, seed, rollback } from '../server/db'
import Mutex from 'await-mutex'
import request from './helpers/request'

let mutex = new Mutex()
let unlock

export function harness (defineTests) {
  test.serial.before('Init server', startServer)
  test.beforeEach('Init database', initDatabase)
  test.serial.beforeEach('Init request', initRequest)

  defineTests()

  test.afterEach.always('Rollback database', rollbackDatabase)
}

export function authenticated (defineTests) {
  harness(() => {
    test.serial.beforeEach('Authenticate', async t => {
      let res = await t.context.api.post('/api/users', {
        username: 'myuser',
        password: 'mypassword'
      })
      console.assert(res.status, 200)

      res = await t.context.api.get('/api/token', {
        username: 'myuser',
        password: 'mypassword'
      })

      console.assert(res.status, 200)
      t.context.auth = res.body
    })
    test.serial.beforeEach('Init request with auth token', initRequest)

    defineTests()
  })
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
