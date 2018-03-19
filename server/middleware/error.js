export default function middleware (app) {
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      const response = {}
      ctx.status = parseInt(error.status, 10) || ctx.status || 500
      switch (ctx.status) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 500:
          response.error = { message: error.message }
          break
        default:
          response.error = { message: 'Unknown error' }
          break
      }
      ctx.body = response
      ctx.app.emit('Error', error, ctx)
    }
  })
}
