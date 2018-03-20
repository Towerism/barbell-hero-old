import dbConfig from './config'

const NODE_ENV = process.env.NODE_ENV || 'development'
let knex = require('knex')(
  Object.assign(dbConfig[NODE_ENV], {})
)

export default knex
