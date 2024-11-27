import vine from '@vinejs/vine'
import { UserStatus, UserType } from '#models/user'
import { unique } from '#app/commons/validators/helpers/db'

export const createUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3),
    lastname: vine.string().trim().minLength(3),
    email: vine.string().email().unique(unique('users', 'email')),
    password: vine.string().trim().minLength(3),
    type: vine.enum(UserType),
    status: vine.enum(UserStatus),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3).optional(),
    lastname: vine.string().trim().minLength(3).optional(),
    email: vine.string().email().unique(unique('users', 'email')).optional(),
    password: vine.string().trim().minLength(3).optional(),
    type: vine.enum(UserType).optional(),
    status: vine.enum(UserStatus).optional(),
  })
)
