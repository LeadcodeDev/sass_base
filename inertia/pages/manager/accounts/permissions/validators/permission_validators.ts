import { z } from 'zod'

export const createPermissionValidator = z.object({
  uid: z.string().max(255),
  label: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
  forAdmin: z.boolean(),
})

export const updatePermissionValidator = z.object({
  uid: z.string().max(255),
  label: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
  forAdmin: z.boolean(),
})

export type CreatePermissionFormSchema = z.infer<typeof createPermissionValidator>
export type UpdatePermissionFormSchema = z.infer<typeof updatePermissionValidator>
