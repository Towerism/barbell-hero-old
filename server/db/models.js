import knex from './knex'

let bookshelf = require('bookshelf')(knex)

export let User = bookshelf.Model.extend({
  tableName: 'user',
  hasSecurePassword: true
})
