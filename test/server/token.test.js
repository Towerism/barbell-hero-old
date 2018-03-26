import { test } from 'ava'
import { decode } from 'jsonwebtoken'

import { harness } from './harness'

harness(() => {
  test('POST /api/token 401', async t => {
    const res = await t.context.api.post('/api/token', {
      username: 'user',
      password: 'password'
    })
    t.is(res.status, 401)
  })
  test('POST /api/token 200', async t => {
    await t.context.api.post('/api/users', {
      username: 'myuser',
      password: 'mypassword'
    })
    const res = await t.context.api.post('/api/token', {
      username: 'myuser',
      password: 'mypassword'
    })

    t.is(res.status, 200)

    let payload = decode(res.body.token)
    t.is(payload.username, 'myuser')
  })
})
