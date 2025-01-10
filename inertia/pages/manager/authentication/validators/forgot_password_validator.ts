import { z } from 'zod'

export const forgotPasswordValidator = z.object({
  email: z.string().email().max(255),
})

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordValidator>
