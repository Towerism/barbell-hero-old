export function up (knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary()
    table.string('username')
    table.string('password', 72)
    table.string('password_digest')
    table.timestamps()
  })
}

export function down (knex, Promise) {
  return knex.schema.dropTable('user')
}
