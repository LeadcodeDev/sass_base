import { z } from 'zod'

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}

export const createUserValidator = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(3),
  password_confirmation: z.string().min(3),
  roles: z.array(z.string()),
  structure: z.array(z.string()),
  type: z.string(),
  status: z.enum([UserStatus.pending, UserStatus.verified, UserStatus.disabled]),
  avatar: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your resume must be less than 7MB.',
  }),
})

export const updateUserValidator = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email(),
  roles: z.array(z.string()),
  structure: z.array(z.string()),
  type: z.string(),
  status: z.enum([UserStatus.pending, UserStatus.verified, UserStatus.disabled]),
})

export type CreateUserFormSchema = z.infer<typeof createUserValidator>
export type UpdateUserFormSchema = z.infer<typeof updateUserValidator>
