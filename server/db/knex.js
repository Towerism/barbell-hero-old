import dbConfig from '../../db.config'

const NODE_ENV = process.env.NODE_ENV || 'development'
let knex = require('knex')(
  dbConfig[NODE_ENV]
)

export default knex
