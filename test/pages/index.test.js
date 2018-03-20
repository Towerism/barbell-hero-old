import test from 'ava'
import { authenticated } from '../harness'

authenticated(() => {
  test('Route / exits without an error', async t => {
    const res = await t.context.api.authenticated.get('/')
    t.is(res.status, 200)
  })
})
