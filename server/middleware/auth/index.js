import jwt from 'koa-jwt'
import Router from 'koa-rest-router'
import { sign } from 'jsonwebtoken'

import unauthenticated from './unauthenticated'

export default function middleware (app) {
  let auth = Router({ prefix: 'api' })

  auth.addRoute('GET', 'token', async (ctx, next) => {
    let user = await ctx.state.User.where({ username: ctx.request.body.username }).fetch()
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
      ctx.throw(401, 'Authentication Error')
    }
  })

  app.use(auth.middleware())

  app.use(jwt({ secret: 'secret' }).unless({ path: unauthenticated }))
}
