import { test } from 'ava'

import { authenticated } from './harness'

authenticated(() => {
  test('GET api/authenticated', async t => {
    const res = await t.context.api.authenticated.get('/api/authenticated')
    t.is(res.status, 200)
    t.is(res.body.user.id, t.context.auth.id)
  })
})
