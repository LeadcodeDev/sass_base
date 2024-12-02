import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import User from '#models/user'

export type State<T> = [T, Dispatch<SetStateAction<T>>]

export type Paginator<T> = {
  data: T[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | undefined
    previousPageUrl: string | undefined
  }
}

export type ZodSchema<T extends z.ZodType<any, any, any>> = z.infer<T>

export type Authenticated = {
  currentUser: User
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}
