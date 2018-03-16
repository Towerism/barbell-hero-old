import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

let nuxt = null

test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '../..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  await nuxt.listen(4000, 'localhost')
})

test('Route / exits without an error', async t => {
  let context = {}
  const { html, error } = await nuxt.renderRoute('/', context)
  t.true(html && error == null)
})
