import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'
import dbConfig from '../db.config'
import Router from 'koa-rest-router'
import mount from 'koa-mount'

export default async function start (_host, _port, options) {
  const app = new Koa()
  const host = _host || process.env.HOST || '127.0.0.1'
  const port = _port || process.env.PORT || 3000

  const NODE_ENV = 'development' || process.env.NODE_ENV

  options = Object.assign({
    nuxtBuild: false,
    rootDir: resolve(__dirname, '..')
  }, options)

  let config = require('../nuxt.config.js')

  config.dev = !(app.env === 'production')
  config.rootDir = options.rootDir

  const nuxt = new Nuxt(config)

  if (config.dev || options.nuxtBuild) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  let knex = require('knex')(
    dbConfig[NODE_ENV]
  )

  let bookshelf = require('bookshelf')(knex)

  let User = bookshelf.Model.extend({
    tableName: 'user',
    hasSecurePassword: true
  })

  let api = Router()
  api.resource('users', {
    async show (ctx, next) {
      let user = await User.where({ id: ctx.params.user }).fetch()
      ctx.body = user
    }
  })

  app.use(mount('/api', async (ctx, next) => {
    let middleware = api.middleware()
    // prevent api routes from invoking the next middleware
    await middleware(ctx, () => {})
    // if api route did not exist, invoke the next middleware
    if (ctx.route == null) {
      await next()
    }
  }))

  app.use(async (ctx) => {
    ctx.status = 200
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`)
  })
  return { nuxt }
}
