import vine from '@vinejs/vine'

export const searchValidator = vine.compile(
  vine.object({
    limit: vine.number().optional(),
    page: vine.number().optional(),
    search: vine.string().optional(),
  })
)
