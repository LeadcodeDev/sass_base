import { Input } from '@/components/ui/input'
import { ChangeEvent, useEffect, useState } from 'react'
import { getCurrentParameters, handleSearchByKey } from '@/commons/utils'
import { useDebouncedEffect } from '@/commons/hooks'

type Props = {
  redirect: string
  placeholder?: string
  searchKey: string
}

export function Searchbar(props: Props) {
  const parameters = getCurrentParameters()

  const [ready, setReady] = useState(false)
  const [search, setSearch] = useState(parameters[props.searchKey] ?? '')

  useEffect(() => setReady(true), [])

  useDebouncedEffect(() => {
    if (!ready) return;

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(props.searchKey, search);
    queryParams.set('page', '1');

    if (!search.length) {
      queryParams.delete(props.searchKey);
    }

    handleSearchByKey(props.redirect, props.searchKey, search, queryParams);
  }, [search], 500)

  return (
    <div className="flex itemsc-center justify-end">
      <Input
        className="!w-64"
        placeholder={props.placeholder}
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
      />
    </div>
  )
}
