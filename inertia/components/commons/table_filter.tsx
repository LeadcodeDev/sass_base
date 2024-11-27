import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { handleChangeItemPerPage, handleChangeParameter } from '@/commons/utils'
import { Combobox } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import { Fragment } from 'react'

export type ComponentFilter = ComboboxFilter[]

type ComboboxFilter = {
  type: 'combobox'
  searchKey: string
  label: string
  options: { label: string; value: string }[]
  multiple?: boolean
}

type Props = {
  itemPerPage?: number
  resources?: ComponentFilter
  resourceRoute: string
}

export default function TableFilter(props: Props) {
  function findCurrentOptionFromParameters(
    options: { label: string; value: string }[],
    searchKey: string
  ) {
    const parameters = new URLSearchParams(window.location.search)
    return options.find((option) => option.value === parameters.get(searchKey))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="cursor-pointer" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 p-3">
        {props.itemPerPage && (
          <div>
            <Label>Results per page</Label>
            <Combobox
              defaultValue={props.itemPerPage?.toString()}
              onChange={(value) => handleChangeItemPerPage(props.resourceRoute, value)}
              expanded
              items={[
                { label: '10', value: '10' },
                { label: '20', value: '20' },
                { label: '50', value: '50' },
                { label: '100', value: '100' },
                { label: 'Infinity', value: '99999999999' },
              ]}
            />
          </div>
        )}
        {props.resources && (
          <Fragment>
            {props.resources.map((resource, index) => (
              <div key={index}>
                <Label>{resource.label}</Label>
                {resource.type === 'combobox' && (
                  <Combobox
                    defaultValue={
                      findCurrentOptionFromParameters(resource.options, resource.searchKey)?.value
                    }
                    onChange={(value) =>
                      handleChangeParameter(props.resourceRoute, resource.searchKey, value)
                    }
                    expanded
                    multiple={resource.multiple}
                    items={resource.options}
                  />
                )}
              </div>
            ))}
          </Fragment>
        )}
      </PopoverContent>
    </Popover>
  )
}
