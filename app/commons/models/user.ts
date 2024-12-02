import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Permission from '#models/permission'
import { Infer } from '@vinejs/vine/types'
import StringHelper from '@adonisjs/core/helpers/string'
import { userSearchValidator } from '#app/accounts/validators/user_validator'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare type: UserType

  @column()
  declare status: UserStatus

  @column()
  declare avatar: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  declare currentAccessToken?: AccessToken

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => Permission)
  declare permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role)
  declare roles: ManyToMany<typeof Role>

  @beforeCreate()
  public static assignUuid(user: User) {
    user.uid = StringHelper.generateRandom(10)
  }

  static search = scope(
    (
      query,
      search: Infer<typeof userSearchValidator>['search'],
      type: Infer<typeof userSearchValidator>['type'],
      status: Infer<typeof userSearchValidator>['status']
    ) => {
      query.if(search, (builder) => {
        const columns = ['firstname', 'lastname', 'email', 'uid']
        columns.forEach((field) => {
          builder.orWhere(field, 'like', `%${search}%`)
        })
      })

      query.if(type, (builder) => builder.andWhere('type', type!))
      query.if(status !== undefined, (builder) => builder.andWhere('status', status!))
    }
  )
}

export enum UserType {
  user,
  practitioner,
  staff,
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}
