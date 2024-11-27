import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'

export const roleSearchValidator = vine.compile(
  vine.object({
    ...searchComposable.getProperties(),
    forAdmin: vine.boolean().optional(),
  })
)

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().trim().minLength(3).optional(),
    forAdmin: vine.boolean(),
    permissions: vine.array(vine.number()).optional(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).optional(),
    description: vine.string().trim().minLength(3).optional(),
    forAdmin: vine.boolean().optional(),
    permissions: vine.array(vine.number()).optional(),
  })
)
