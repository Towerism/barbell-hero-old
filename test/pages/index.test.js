import test from 'ava'
import start from '../../server/start'
import { resolve } from 'path'

let nuxt = null
test.before('Init Nuxt.js', async t => {
  let context = await start('localhost', 4000, {
    rootDir: resolve(__dirname, '../..')
  })
  nuxt = context.nuxt
})

test('Route / exits without an error', async t => {
  let context = {}
  const { html, error } = await nuxt.renderRoute('/', context)
  t.true(html && error == null)
})
