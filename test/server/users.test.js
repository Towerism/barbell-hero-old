import { test } from 'ava'
import request from 'supertest'

import { harness } from '../harness'

harness(() => {
  test('GET api/users/1', async t => {
    const res = await request(t.context.server)
      .get('/api/users/1')
    t.is(res.status, 200)
    t.is(res.body.username, 'admin')
  })
})
