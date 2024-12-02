import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import { Infer } from '@vinejs/vine/types'
import { permissionSearchValidator } from '#app/accounts/validators/permissions_validator'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare label: string

  @column()
  declare description: string

  @column()
  declare forAdmin: boolean

  @column()
  declare deletable: boolean

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @manyToMany(() => Role)
  declare roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static search = scope(
    (
      query,
      search: Infer<typeof permissionSearchValidator>['search'],
      forAdmin: Infer<typeof permissionSearchValidator>['forAdmin']
    ) => {
      query.if(search, (builder) => {
        const columns = ['uid', 'label']
        columns.forEach((field) => {
          builder.orWhere(field, 'like', `%${search}%`)
        })
      })

      query.if(forAdmin !== undefined, (builder) => builder.andWhere('for_admin', forAdmin!))
    }
  )
}
