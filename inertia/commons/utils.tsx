import { router } from '@inertiajs/react'

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
