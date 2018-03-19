import { test } from 'ava'

import { harness } from '../harness'

harness(() => {
  test('GET api/users/1', async t => {
    const res = await t.context.request.get('/api/users/1')
    t.is(res.status, 200)
    t.is(res.body.username, 'admin')
  })

  test('POST api/users', async t => {
    const res = await t.context.request.post('/api/users', {
      username: 'myuser',
      password: 'mypassword'
    })
    t.is(res.status, 200)
    t.is(res.body.username, 'myuser')
  })
})
