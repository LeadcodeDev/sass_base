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
import { useState } from 'react'
import SidebarUserDetail from '@/pages/manager/users/components/sidebar_user_detail'

import User from '#models/user'
import { Paginator } from '@/commons/types'
import { Searchbar } from '@/components/commons/searchbar'
import { CreateUserDialog } from '@/pages/manager/users/components/create_user_dialog'

type Props = {
  users: Paginator<User>
}

export default function UsersOverview(props: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <ManagerLayout
      breadcrumb={[
        { label: 'Manager', url: '/manager' },
        { label: 'Users overview', url: '/manager/users' },
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a user..."
            searchKey="search"
            redirect="/manager/users/overview"
          />

          <CreateUserDialog />
        </div>
      }
    >
      <Table meta={props.users.meta}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Identité</TableHead>
            <TableHead>Type de compte</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          data={props.users.data}
          builder={(user) => (
            <TableRow onClick={() => setSelectedUser(user)} key={user.id}>
              <TableCell className="font-medium whitespace-nowrap !text-xs">{user.uid}</TableCell>
              <TableCell>
                {user.firstname} {user.lastname}
              </TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Badge variant="outline">{user.type}</Badge>
                {!user.isActive && <Badge variant="destructive">Deactivate</Badge>}
              </TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </TableRow>
          )}
        />
      </Table>

      <SidebarUserDetail state={[selectedUser, setSelectedUser]} />
    </ManagerLayout>
  )
}
