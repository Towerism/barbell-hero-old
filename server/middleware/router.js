import Router from 'koa-rest-router'

export default function middleware (app) {
  let api = Router({ prefix: 'api' })
  api.resource('users', {
    async show (ctx, next) {
      let user = await ctx.state.User.where({ id: ctx.params.user }).fetch()
      ctx.body = user
    },
    async create (ctx, next) {
      let user = new ctx.state.User(ctx.request.body)
      ctx.body = await user.save()
    }
  })

  app.use(api.middleware())
}
