import { models } from '../db'

export default function middleware (app) {
  app.use(async (ctx, next) => {
    addModel('User', models.User, ctx)
    await next()
  })
}

function addModel (name, model, ctx) {
  ctx.state[name] = model
}
