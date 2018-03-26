process.env.NODE_ENV = 'test'

import spawn from 'cross-spawn'
import { resolve } from 'path'

import { initDatabase } from '../common'
import start from '../../server/start'

async function run () {
  let context = await start('localhost', 0, {
    rootDir: resolve(__dirname, '../..')
  })
  process.env.PORT = context.port
  await initDatabase()

  let opts = process.argv.slice(2)
  if (opts.indexOf('config') === -1) {
    opts = opts.concat(['--config', 'test/ui/nightwatch.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }
  console.log('opts: ', opts)

  const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    context.server.close()
    process.exit(code)
  })

  runner.on('error', function (error) {
    context.server.close()
    throw error
  })
}

run()
