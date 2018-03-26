import Router from 'koa-rest-router'
import { decode } from 'jsonwebtoken'

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
  api.addRoute('GET', 'authenticated', (ctx, next) => {
    let authHeader = ctx.request.headers['authorization']
    let tokenMatch = authHeader.match(/Bearer (.*)/)
    let token = tokenMatch[1]
    let user = decode(token)
    ctx.body = { user }
  })
  app.use(api.middleware())
}
