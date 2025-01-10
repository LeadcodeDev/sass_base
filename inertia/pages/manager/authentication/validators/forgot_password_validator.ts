import { z } from 'zod'

export const forgotPasswordValidator = z.object({
  email: z.string().max(255),
})

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordValidator>
