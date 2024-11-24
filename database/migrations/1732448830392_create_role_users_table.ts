import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigint('role_id').references('id').inTable('roles')
      table.bigint('user_id').references('id').inTable('roles')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}