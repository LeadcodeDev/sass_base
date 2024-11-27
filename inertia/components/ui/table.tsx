import * as React from 'react'
import { forwardRef, Fragment, HTMLAttributes, ReactNode } from 'react'
import { cn, handleChangeCurrentPage } from '@/commons/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Paginator } from '@/commons/types'

type TableProps<T> = HTMLAttributes<HTMLTableElement> & {
  meta: Paginator<T>['meta']
  empty?: ReactNode
}

function Table<T>({ className, ...props }: TableProps<T>) {
  if (!props.meta.total) {
    return props.empty ?? 'No data available'
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />

      <Pagination className="flex items-center justify-between py-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!props.meta.previousPageUrl}
              page={props.meta.previousPageUrl?.replace('/?page=', '')}
              className={cn(props.meta.previousPageUrl && 'cursor-pointer')}
            />
          </PaginationItem>

          {props.meta.lastPage == 1 ? (
            <PaginationItem>
              <button className="underline">{props.meta.firstPage}</button>
            </PaginationItem>
          ) : (
            <Fragment>
              {props.meta.currentPage == props.meta.firstPage ? (
                <Fragment>
                  <PaginationItem>
                    <button className="underline">{props.meta.firstPage}</button>
                  </PaginationItem>
                  <PaginationItem>
                    <button onClick={() => handleChangeCurrentPage(props.meta.currentPage + 1)}>
                      {props.meta.firstPage + 1}
                    </button>
                  </PaginationItem>
                  {props.meta.lastPage > 2 && (
                    <PaginationItem>
                      <button onClick={() => handleChangeCurrentPage(props.meta.lastPage)}>
                        {props.meta.lastPage}
                      </button>
                    </PaginationItem>
                  )}
                </Fragment>
              ) : props.meta.currentPage == props.meta.lastPage ? (
                <Fragment>
                  {props.meta.currentPage > 2 && (
                    <PaginationItem>
                      <button onClick={() => handleChangeCurrentPage(props.meta.firstPage)}>
                        {props.meta.firstPage}
                      </button>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <button onClick={() => handleChangeCurrentPage(props.meta.lastPage - 1)}>
                      {props.meta.lastPage - 1}
                    </button>
                  </PaginationItem>
                  <PaginationItem>
                    <button className="underline">{props.meta.lastPage}</button>
                  </PaginationItem>
                </Fragment>
              ) : (
                <Fragment>
                  <PaginationItem>
                    <button onClick={() => handleChangeCurrentPage(props.meta.currentPage - 1)}>
                      {props.meta.currentPage - 1}
                    </button>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="underline">{props.meta.currentPage}</span>
                  </PaginationItem>
                  <PaginationItem>
                    <button onClick={() => handleChangeCurrentPage(props.meta.currentPage + 1)}>
                      {props.meta.currentPage + 1}
                    </button>
                  </PaginationItem>
                </Fragment>
              )}
            </Fragment>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!props.meta.nextPageUrl}
              page={props.meta.nextPageUrl?.replace('/?page=', '')}
              className={cn(props.meta.nextPageUrl && 'cursor-pointer')}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

Table.displayName = 'Table'

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

type TableBodyProps<T> = HTMLAttributes<HTMLTableSectionElement> & {
  data: T[]
  builder: (data: T, ref: unknown) => ReactNode
}

function TableBody<T>({ className, ...props }: TableBodyProps<T>) {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)}>
      {props.data.map((data, index) => props.builder(data, index))}
    </tbody>
  )
}

TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
