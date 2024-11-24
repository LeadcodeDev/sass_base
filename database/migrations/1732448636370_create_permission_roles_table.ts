import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permission_role'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigint('permission_id').references('id').inTable('permissions')
      table.bigint('role_id').references('id').inTable('roles')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
