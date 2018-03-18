import test from 'ava'
import { before, nuxt } from '../harness'

test.before('Init Nuxt.js', before)

test('Route / exits without an error', async t => {
  let context = {}
  const { html, error } = await nuxt().renderRoute('/', context)
  t.true(html && error == null)
})
