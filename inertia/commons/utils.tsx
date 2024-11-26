import { router } from '@inertiajs/react'
import { ExternalToast } from 'sonner'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getCurrentParameters(source?: URLSearchParams): { [key: string]: string } {
  const queryParams = source ?? new URLSearchParams(window.location.search)
  return queryParams.entries().reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}

export function handleChangeItemPerPage(value: string | number) {
  router.get('/manager/users/overview', {
    ...getCurrentParameters(),
    limit: value,
  })
}

export function handleChangeCurrentPage(value: string | number | undefined) {
  router.get('/manager/users/overview', {
    ...getCurrentParameters(),
    page: value,
  })
}

export function handleSearchByKey(
  route: string,
  searchKey: string,
  value: string | number | undefined,
  source?: URLSearchParams
) {
  const payload = getCurrentParameters(source)

  if (value) {
    payload[searchKey] = value.toString()
  }

  router.get(route, payload, { preserveState: true })
}

enum ToastVariant {
  error= 'error',
  success= 'success',
}

const baseVariant: ExternalToast = {
  closeButton: true,
  unstyled: true,
  classNames: {
    toast: 'w-[356px] p-4 rounded flex gap-2 border border-input !shadow-sm',
    title: 'flex items-center -mt-0.5 text-sm font-semibold',
    content: '!text-sm',
    success: '!text-green-600 !bg-green-50',
    error: '!text-red-600 !bg-red-50',
    warning: '!text-yellow-600 !bg-yellow-50',
    info: '!text-blue-600 !bg-blue-50',
    description: 'font-medium',
    closeButton: 'bg-white border border-input',
  },
}

export const toastVariant: { [key in ToastVariant]: ExternalToast } = {
  error: baseVariant,
  success: baseVariant
}
