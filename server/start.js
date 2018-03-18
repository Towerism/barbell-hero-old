import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'
import middleware from './middleware'

export default async function start (_host, _port, options) {
  const app = new Koa()
  const host = _host || process.env.HOST || '127.0.0.1'
  const port = _port != null ? _port : process.env.PORT || 3000

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

  middleware(app)

  app.use(async (ctx) => {
    if (ctx.request.url.match(/^\/api/) != null) {
      // nuxt doesn't have to route since the api already did
      return
    }
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
