import securePassword from 'bookshelf-secure-password'

export default function getModels (knex) {
  let bookshelf = require('bookshelf')(knex)
  bookshelf.plugin(securePassword)

  let User = bookshelf.Model.extend({
    tableName: 'user',
    hasSecurePassword: true
  })

  return { User }
}
