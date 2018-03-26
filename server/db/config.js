let migrations = {
  directory: 'server/db/migrations'
}
let seeds = {
  directory: 'server/db/seeds'
}

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    },
    migrations,
    seeds,
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations,
    seeds,
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    migrations,
    seeds,
    useNullAsDefault: true
  }
}
