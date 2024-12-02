import { z } from 'zod'

export const loginValidator = z.object({
  email: z.string().max(255),
  password: z.string().min(2).max(50),
})

export type LoginFormSchema = z.infer<typeof loginValidator>
