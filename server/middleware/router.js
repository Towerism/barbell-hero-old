import Router from 'koa-rest-router'
import { sign } from 'jsonwebtoken'

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

  api.addRoute('GET', 'token', async (ctx, next) => {
    let user = await ctx.state.User.where({ username: ctx.request.body.username }).fetch()
    if (user == null) {
      ctx.throw(401, 'User not found')
    }
    try {
      user = await user.authenticate(ctx.request.body.password)
      ctx.body = {
        token: sign({
          id: user.get('id'),
          username: user.get('username')
        }, 'secret', {
          expiresIn: '1h'
        })
      }
    } catch (error) {
      ctx.throw(401, error)
    }
  })

  app.use(api.middleware())
}
