import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserStatus, UserType } from '#models/user'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.string('uid').notNullable().unique()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('avatar').nullable()
      table.enum('type', Object.keys(UserType)).notNullable().defaultTo('user')
      table.enum('status', Object.keys(UserStatus)).notNullable().defaultTo('pending')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
