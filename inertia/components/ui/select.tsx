import React, { forwardRef, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/commons/utils'
import { CheckIcon, ChevronsUpDown, Plus } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface SelectBoxProps {
  options: Option[]
  defaultValue?: string[] | string
  onChange?: (defaultValues: string[] | string) => void
  placeholder?: string
  inputPlaceholder?: string
  emptyPlaceholder?: string
  className?: string
  multiple?: boolean
  disabled?: boolean
}

const SelectBox = forwardRef<HTMLInputElement, SelectBoxProps>((props, ref) => {
  const [currentValue, setCurrentValue] = useState<string | string[]>(props.defaultValue ?? [])
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [isOpen, setIsOpen] = React.useState(false)

  function handleSelect(selectedValue: string) {
    if (props.multiple) {
      const newValue =
        props.defaultValue?.includes(selectedValue) && Array.isArray(props.defaultValue)
          ? props.defaultValue.filter((v) => v !== selectedValue)
          : [...(props.defaultValue ?? []), selectedValue]
      props.onChange?.(newValue)
      setCurrentValue(newValue)
    } else {
      if (currentValue.includes(selectedValue)) {
        props.onChange?.('')
        setCurrentValue([])
      } else {
        props.onChange?.(selectedValue)
        setIsOpen(false)
        setCurrentValue([selectedValue])
      }
    }
  }

  function handleClear() {
    props.onChange?.(props.multiple ? [] : '')
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex min-h-[36px] h-full cursor-pointer items-center justify-between rounded-md border !px-2 py- data-[state=open]:border-ring w-full',
            props.disabled ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer',
            props.className
          )}
        >
          <div
            className={cn(
              'items-center gap-1 overflow-hidden text-sm',
              props.multiple ? 'flex flex-grow flex-wrap ' : 'inline-flex whitespace-nowrap'
            )}
          >
            {props.defaultValue &&
              props.defaultValue.length > 0 &&
              (props.multiple
                ? props.options
                    .filter(
                      (option) =>
                        Array.isArray(props.defaultValue) &&
                        props.defaultValue.includes(option.value)
                    )
                    ?.map((option) => (
                      <span
                        key={option.value}
                        className="inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <span>{option.label}</span>
                        <span
                          onClick={(e) => {
                            e.preventDefault()
                            handleSelect(option.value)
                          }}
                          className="flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground"
                        >
                          <Plus className="rotate-45 opacity-50" />
                        </span>
                      </span>
                    ))
                : props.options.find((option) => option.value === props.defaultValue)?.label)}

            {!currentValue.length && (
              <span className="text-muted-foreground">{props.placeholder}</span>
            )}
          </div>
          <div className="flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch">
            {props.defaultValue && props.defaultValue.length > 0 ? (
              <div
                onClick={(e) => {
                  e.preventDefault()
                  handleClear()
                }}
              >
                <ChevronsUpDown />
              </div>
            ) : (
              <div>
                <ChevronsUpDown />
              </div>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <div className="relative">
            <CommandInput
              value={searchTerm}
              onValueChange={(e) => setSearchTerm(e)}
              ref={ref}
              placeholder={props.inputPlaceholder ?? 'Search...'}
              className="h-9"
            />
            {searchTerm && (
              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchTerm('')}
              >
                <Plus className="rotate-45 size-4" />
              </div>
            )}
          </div>
          <CommandList>
            <CommandEmpty>{props.emptyPlaceholder ?? 'No results found.'}</CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-64">
                  {props.options?.map((option) => {
                    const isSelected =
                      Array.isArray(props.defaultValue) && props.defaultValue.includes(option.value)
                    return (
                      <CommandItem
                        key={option.value}
                        defaultValue={option.value}
                        onSelect={() => handleSelect(option.value)}
                        className="!cursor-pointer"
                      >
                        {props.multiple && (
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <CheckIcon />
                          </div>
                        )}
                        <span>{option.label}</span>
                        {!props.multiple && option.value === props.defaultValue && (
                          <CheckIcon
                            className={cn(
                              'ml-auto',
                              option.value === props.defaultValue ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        )}
                      </CommandItem>
                    )
                  })}
                </div>
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})

SelectBox.displayName = 'SelectBox'

export default SelectBox
