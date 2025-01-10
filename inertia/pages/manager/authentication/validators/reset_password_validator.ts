import { z } from 'zod'

export const resetPasswordValidator = z.object({
  password: z.string().min(2).max(50),
  password_confirmation: z.string().min(2).max(50),
})

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordValidator>
