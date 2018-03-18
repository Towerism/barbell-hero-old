import test from 'ava'
import { harness } from '../harness'

harness(() => {
  test('Route / exits without an error', async t => {
    const { html, error } = await t.context.nuxt.renderRoute('/', {})
    t.true(html && error == null)
  })
})
