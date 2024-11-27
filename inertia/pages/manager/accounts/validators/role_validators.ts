import { z } from 'zod'

export const createRoleValidator = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
  forAdmin: z.boolean(),
  permissions: z.array(z.string()),
})

export const updateRoleValidator = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
  forAdmin: z.boolean(),
  permissions: z.array(z.string()),
})

export type CreateRoleFormSchema = z.infer<typeof createRoleValidator>
export type UpdateRoleFormSchema = z.infer<typeof updateRoleValidator>
