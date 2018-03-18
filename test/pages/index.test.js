import test from 'ava'
import { ensureServerIsStartedFresh } from '../harness'

ensureServerIsStartedFresh()

test('Route / exits without an error', async t => {
  const { html, error } = await t.context.nuxt.renderRoute('/', {})
  t.true(html && error == null)
})
