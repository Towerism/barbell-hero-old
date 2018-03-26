import { test } from 'ava'
import { decode } from 'jsonwebtoken'
import { resolve } from 'path'

import request from './helpers/request'

import { initDatabase, rollbackDatabase } from '../common'
import start from '../../server/start'

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

      res = await t.context.api.post('/api/token', {
        username: 'myuser',
        password: 'mypassword'
      })

      console.assert(res.status, 200)
      t.context.auth = res.body
      t.context.auth.id = decode(res.body.token).id
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
    rootDir: resolve(__dirname, '../..')
  })
  let port = t.context.port
  t.context.serverUrl = `http://localhost:${port}`
  console.log('serverUrl: ', t.context.serverUrl)
}
