import { useEffect, useState } from 'react'
import Permission from '#models/permission'

type Props = {
  limit: number
}

export function usePermission(props: Props) {
  const [state, setState] = useState<Permission[]>([])

  useEffect(() => {
    const queryParam = new URLSearchParams()
    queryParam.append('limit', props.limit.toString())

    fetch(`/manager/permissions/overview?${queryParam}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (resource) => setState(await resource.data))
  }, [])

  return state
}
