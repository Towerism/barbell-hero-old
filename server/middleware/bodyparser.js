import bodyParser from 'koa-bodyparser'

export default function middleware (app) {
  app.use(bodyParser())
}
