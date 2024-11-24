import vine from '@vinejs/vine'

export const createPermissionValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(3),
    uid: vine.string().trim().minLength(3),
  })
)

export const updatePermissionValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(3).optional(),
    uid: vine.string().trim().minLength(3).optional(),
  })
)
