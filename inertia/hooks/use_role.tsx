import { useEffect, useState } from 'react'
import Role from '#models/role'

type Props = {
  limit: number
  skip?: boolean
}

export function useRole(props: Props) {
  const [state, setState] = useState<Role[]>([])

  useEffect(() => {
    if (props.skip) return

    const queryParam = new URLSearchParams()
    queryParam.append('limit', props.limit.toString())

    fetch(`/manager/roles/overview?${queryParam}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (resource) => setState(await resource.data))
  }, [props.skip])

  return state
}
