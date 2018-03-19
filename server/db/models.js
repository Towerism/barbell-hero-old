import knex from './knex'
import securePassword from 'bookshelf-secure-password'

let bookshelf = require('bookshelf')(knex)
bookshelf.plugin(securePassword)

export let User = bookshelf.Model.extend({
  tableName: 'user',
  hasSecurePassword: true
})
