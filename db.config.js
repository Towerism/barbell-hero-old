export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './testdb.sqlite'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    useNullAsDefault: true
  }
}
