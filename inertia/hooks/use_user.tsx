import { useEffect, useState } from 'react'
import { AccessTokenDbColumns } from '@adonisjs/auth/types/access_tokens'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

type Props = {
  uid?: string
  skip?: boolean
}

export function useUserPermissions(permissions: string[] | string, strategy?: string): boolean {
  const page  = usePage<SharedProps>()
  const user = page.props.currentUser

  if (!user) return false
  if (!permissions) return false

  const targetPermissions = Array.isArray(permissions) ? permissions : [permissions]

  const match: { [key: string]: () => boolean } = {
    'and': () => targetPermissions.every((permission) => page.props.currentPermissions.includes(permission)),
    'or': () => targetPermissions.some((permission) => page.props.currentPermissions.includes(permission)),
    _: () => page.props.currentPermissions.some((permission) => permission === targetPermissions[0]),
  }

  return (strategy ? match[strategy] : match._)()
}

export function useUserConnexions(props: Props) {
  const [state, setState] = useState<AccessTokenDbColumns[]>([])

  useEffect(() => {
    if (props.skip) return

    const queryParam = new URLSearchParams()
    queryParam.append('order', 'desc')

    fetch(`/manager/users/${props.uid}/connexions?${queryParam}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(setState)
  }, [props.skip])

  return state
}
