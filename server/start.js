import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'
import middleware from './middleware'

export default async function start (_host, _port, options) {
  const app = new Koa()
  let host = _host || process.env.HOST || '127.0.0.1'
  let port = _port != null ? _port : process.env.PORT || 3000

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

  let server = await listen(app, port, host)
  port = server.address().port
  console.log(`Server listening on ${host}:${port}`)

  options = Object.assign({
    nuxtBuild: false,
    rootDir: resolve(__dirname, '..')
  }, options)

  let config = Object.assign(require('../nuxt.config.js'), {
    dev: !(app.env === 'production'),
    debug: !(app.env === 'production'),
    rootDir: options.rootDir,
    axios: {
      port
    }
  })

  const nuxt = new Nuxt(config)

  if (config.dev || options.nuxtBuild) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  return { nuxt, server, port }
}

async function listen (app, port, host) {
  return new Promise((resolve, reject) => {
    let server = app.listen(port, host, () => resolve(server))
  })
}
