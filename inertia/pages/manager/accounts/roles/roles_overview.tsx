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
import { CreateRoleDialog } from '@/pages/manager/accounts/roles/components/create_role_dialog'
import UpdateRoleSidebar from '@/pages/manager/accounts/roles/components/update_role_sidebar'
import Role from '#models/role'
import Permission from '#models/permission'
import Protected from '@/components/commons/protected'

type Props = {
  roles: Paginator<Role>
  permissions: Permission[]
}

export default function RolesOverview(props: Props) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  return (
    <ManagerLayout
      breadcrumb={[
        { label: 'Manager', url: '/manager' },
        { label: 'Roles overview', url: '/manager/roles' },
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a role..."
            searchKey="search"
            redirect="/manager/roles/overview"
          />

          <TableFilter
            itemPerPage={props.roles.meta.perPage}
            resources={filterOptions}
            resourceRoute="/manager/roles/overview"
          />

          <Protected permissions="manager:roles:store">
            <CreateRoleDialog trigger={<Button size="sm">New role</Button>} />
          </Protected>
        </div>
      }
    >
      <Fragment>
        <div className="p-5 border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Roles account
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your role accounts. You can create, update, delete, and view roles.
          </p>
        </div>
        <Table meta={props.roles.meta} empty={<EmptyData />}>
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
            data={props.roles.data}
            builder={(role) => (
              <RowBuilder key={role.id} role={role} state={[selectedRole, setSelectedRole]} />
            )}
          />
        </Table>

        <UpdateRoleSidebar state={[selectedRole, setSelectedRole]} />
      </Fragment>
    </ManagerLayout>
  )
}

function RowBuilder(props: { role: Role; state: State<Role | null> }) {
  const [_, setSelectedRole] = props.state

  return (
    <TableRow>
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge variant="outline" className="cursor-pointer">
          {props.role.uid}
        </Badge>
      </TableCell>
      <TableCell onClick={() => setSelectedRole(props.role)} className="cursor-pointer">
        {props.role.name}
      </TableCell>
      <TableCell
        onClick={() => setSelectedRole(props.role)}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <Badge variant="outline">{props.role.forAdmin ? 'true' : 'false'}</Badge>
      </TableCell>
      <TableCell onClick={() => setSelectedRole(props.role)} className="cursor-pointer">
        <p className="truncate max-w-[300px]">{props.role.description}</p>
      </TableCell>
      <TableCell onClick={() => setSelectedRole(props.role)} className="text-right cursor-pointer">
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
            <CreateRoleDialog
              trigger={
                <Button variant="outline" size="sm">
                  <PlusIcon />
                  New role
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
