import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'

export const permissionSearchValidator = vine.compile(
  vine.object({
    ...searchComposable.getProperties(),
    forAdmin: vine.boolean().optional(),
  })
)

export const createPermissionValidator = vine.compile(
  vine.object({
    uid: vine.string().trim().minLength(3),
    label: vine.string().trim().minLength(3),
    description: vine.string().trim().minLength(3).optional(),
    forAdmin: vine.boolean(),
  })
)

export const updatePermissionValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(3).optional(),
    uid: vine.string().trim().minLength(3).optional(),
    description: vine.string().trim().minLength(3).optional(),
    forAdmin: vine.boolean(),
  })
)
