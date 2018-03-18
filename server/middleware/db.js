import dbConfig from '../../db.config'

export default function middleware (app) {
  const NODE_ENV = 'development' || process.env.NODE_ENV

  let knex = require('knex')(
    dbConfig[NODE_ENV]
  )

  let bookshelf = require('bookshelf')(knex)

  let User = bookshelf.Model.extend({
    tableName: 'user',
    hasSecurePassword: true
  })

  app.use(async (ctx, next) => {
    addModel('user', User, ctx)
    await next()
  })
}

function addModel (name, model, ctx) {
  ctx.state[name] = model
}
