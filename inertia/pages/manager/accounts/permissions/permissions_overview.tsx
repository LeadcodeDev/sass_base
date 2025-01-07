import { ManagerLayout } from '@/components/layouts/manager_layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Fragment, useState } from 'react'
import { Paginator, State } from '@/commons/types'
import { Searchbar } from '@/components/commons/searchbar'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import TableFilter, { ComponentFilter } from '@/components/commons/table_filter'
import Permission from '#models/permission'
import Protected from '@/components/commons/protected'
import UpdatePermissionSidebar from '@/pages/manager/accounts/permissions/components/permissions/update_permission_sidebar'
import { CreatePermissionDialog } from '@/pages/manager/accounts/permissions/components/permissions/create_permission_dialog'

type Props = {
  permissions: Paginator<Permission>
}

export default function PermissionsOverview(props: Props) {
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)

  return (
    <ManagerLayout
      breadcrumb={[
        { label: 'Manager', url: '/manager' },
        { label: 'Permissions overview', url: '/manager/permissions' },
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a permission..."
            searchKey="search"
            redirect="/manager/permissions/overview"
          />

          <TableFilter
            itemPerPage={props.permissions.meta.perPage}
            resources={filterOptions}
            resourceRoute="/manager/permissions/overview"
          />

          <Protected permissions="manager:permissions:store">
            <CreatePermissionDialog trigger={<Button size="sm">New permission</Button>} />
          </Protected>
        </div>
      }
    >
      <Fragment>
        <div className="p-5 border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Permission accounts
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your permission accounts. You can create, update, delete, and view permissions.
          </p>
        </div>
        <Table meta={props.permissions.meta} empty={<EmptyData />}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[200px]">Label</TableHead>
              <TableHead className="w-[100px]">Admin only</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            data={props.permissions.data}
            builder={(permission) => (
              <RowBuilder
                key={permission.uid}
                permission={permission}
                state={[selectedPermission, setSelectedPermission]}
              />
            )}
          />
        </Table>

        <UpdatePermissionSidebar state={[selectedPermission, setSelectedPermission]} />
      </Fragment>
    </ManagerLayout>
  )
}

function RowBuilder(props: { permission: Permission; state: State<Permission | null> }) {
  const [_, setSelectedPermission] = props.state

  return (
    <TableRow>
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge variant="outline" className="cursor-pointer">
          {props.permission.uid}
        </Badge>
      </TableCell>
      <TableCell onClick={() => setSelectedPermission(props.permission)} className="cursor-pointer">
        {props.permission.label}
      </TableCell>
      <TableCell
        onClick={() => setSelectedPermission(props.permission)}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <Badge variant="outline">{props.permission.forAdmin ? 'true' : 'false'}</Badge>
      </TableCell>
      <TableCell onClick={() => setSelectedPermission(props.permission)} className="cursor-pointer">
        <p className="truncate max-w-[300px]">{props.permission.description}</p>
      </TableCell>
      <TableCell
        onClick={() => setSelectedPermission(props.permission)}
        className="text-right cursor-pointer"
      >
        Actions
      </TableCell>
    </TableRow>
  )
}

function EmptyData() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-center max-h-screen h-[40rem] border border-input rounded-md p-5">
        <div className="">
          <h2 className="text-xl text-center mt-5">No data found.</h2>
          <div className="mt-5">
            <CreatePermissionDialog
              trigger={
                <Button variant="outline" size="sm">
                  <PlusIcon />
                  New permission
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const filterOptions: ComponentFilter = [
  {
    type: 'combobox',
    label: 'Admin only',
    multiple: false,
    searchKey: 'forAdmin',
    options: [
      { label: 'Oui', value: 'true' },
      { label: 'Non', value: 'false' },
    ],
  },
]
