import vine from '@vinejs/vine'

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
