import bodyparser from './bodyparser'
import db from './db'
import router from './router'

export default function middleware (app) {
  bodyparser(app)
  db(app)
  router(app)
}
