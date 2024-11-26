import vine from '@vinejs/vine'
import { UserType } from '#models/user'

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
    password: vine.string().trim().minLength(3),
    type: vine.enum(UserType),
    is_active: vine.boolean(),
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
    })
  )
