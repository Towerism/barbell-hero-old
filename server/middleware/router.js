import Router from 'koa-rest-router'

export default function middleware (app) {
  let api = Router({ prefix: 'api' })
  api.resource('users', {
    async show (ctx, next) {
      let user = await ctx.state.user.where({ id: ctx.params.user }).fetch()
      ctx.body = user
    },
    async create (ctx, next) {
      ctx.body = ctx.request.body
    }
  })

  app.use(api.middleware())
}
