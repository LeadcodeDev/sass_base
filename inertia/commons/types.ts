import { Dispatch, SetStateAction } from 'react'

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
