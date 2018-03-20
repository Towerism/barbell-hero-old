import auth from './auth'
import bodyparser from './bodyparser'
import db from './db'
import error from './error'
import router from './router'

export default function middleware (app) {
  error(app)
  bodyparser(app)
  db(app)
  auth(app)
  router(app)
}
