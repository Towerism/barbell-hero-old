import test from 'ava'
import { harness } from '../harness'

harness(() => {
  test('Route / renders without an error', async t => {
    const res = await t.context.api.get('/')
    t.is(res.status, 200)
  })
})
