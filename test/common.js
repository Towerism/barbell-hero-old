import Mutex from 'await-mutex'

import { migrate, seed, rollback } from '../server/db'

let mutex = new Mutex()
let unlock

export async function initDatabase (t) {
  unlock = await mutex.lock()
  await migrate()
  await seed()
}

export async function rollbackDatabase (t) {
  await rollback()
  unlock()
}
