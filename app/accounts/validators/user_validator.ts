import vine from '@vinejs/vine'
import { UserType } from '#models/user'
import { searchComposable } from '#app/commons/validators/searchable'

export const userSearchValidator = vine.compile(
  vine.object({
    ...searchComposable.getProperties(),
    type: vine.enum(UserType).optional(),
    isActive: vine.boolean().optional(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3),
    lastname: vine.string().trim().minLength(3),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password: vine.string().trim().minLength(3).confirmed(),
    type: vine.enum(UserType),
    isActive: vine.boolean(),
    roles: vine.array(vine.number()).optional(),
  })
)

export const updateUserValidator = (uid: string) =>
  vine.compile(
    vine.object({
      firstname: vine.string().trim().minLength(3).optional(),
      lastname: vine.string().trim().minLength(3).optional(),
      email: vine
        .string()
        .email()
        .unique(async (db, value) => {
          const match = await db
            .from('users')
            .select('id')
            .where('email', value)
            .andWhereNot('uid', uid)
            .first()
          return !match
        })
        .optional(),
      type: vine.enum(UserType).optional(),
      isActive: vine.boolean().optional(),
      roles: vine.array(vine.number()).optional(),
    })
  )
