import vine from '@vinejs/vine'
import { UserStatus, UserType } from '#models/user'
import { searchComposable } from '#app/commons/validators/searchable'
import { unique } from '#app/commons/validators/helpers/db'

export const userSearchValidator = vine.compile(
  vine.object({
    ...searchComposable.getProperties(),
    type: vine.enum(UserType).optional(),
    status: vine.enum(UserStatus).optional(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3),
    lastname: vine.string().trim().minLength(3),
    email: vine.string().email().unique(unique('users', 'email')),
    password: vine.string().trim().minLength(3).confirmed(),
    type: vine.enum(UserType),
    status: vine.enum(UserStatus),
    roles: vine.array(vine.number()).optional(),
    permissions: vine.array(vine.number()).optional(),
    avatar: vine
      .file({
        size: '8mb',
        extnames: ['jpg', 'png'],
      })
      .optional(),
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
      status: vine.enum(UserStatus).optional(),
      roles: vine.array(vine.number()).optional(),
      permissions: vine.array(vine.number()).optional(),
      avatar: vine
        .file({
          size: '2mb',
          extnames: ['jpg', 'png'],
        })
        .optional(),
    })
  )

export const resetPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim().minLength(3).confirmed(),
  })
)

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().maxLength(255),
  })
)
