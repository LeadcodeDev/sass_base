import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Permission from '#models/permission'
import StringHelper from '@adonisjs/core/helpers/string'
import { Infer } from '@vinejs/vine/types'
import { roleSearchValidator } from '#app/accounts/validators/roles_validator'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare forAdmin: boolean

  @manyToMany(() => Permission)
  declare permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(role: Role) {
    role.uid = StringHelper.generateRandom(10)
  }

  static search = scope(
    (
      query,
      search: Infer<typeof roleSearchValidator>['search'],
      forAdmin: Infer<typeof roleSearchValidator>['forAdmin']
    ) => {
      query.if(search, (builder) => {
        const columns = ['uid', 'name']
        columns.forEach((field) => {
          builder.orWhere(field, 'like', `%${search}%`)
        })
      })

      query.if(forAdmin !== undefined, (builder) => builder.andWhere('for_admin', forAdmin!))
    }
  )
}
