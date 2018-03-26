import test from 'ava'
import { harness } from './harness'

harness(() => {
  test('GET / redirects when not logged in', async t => {
    const res = await t.context.api.get('/')
    t.is(res.status, 302)
  })
})
