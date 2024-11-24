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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Link } from '@inertiajs/react'

export default function UsersOverview() {
  const [selectedUser, setSelectedUser] = useState<unknown | null>(null)

  return (
    <ManagerLayout
      breadcrumb={[
        { label: 'Manager', url: '/manager' },
        { label: 'Users overview', url: '/manager/users' },
      ]}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Identité</TableHead>
            <TableHead>Type de compte</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, index) => (
            <TableRow onClick={() => setSelectedUser('user')} key={index}>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>John doe</TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Badge variant="outline">Utilisateur</Badge>
                {index == 2 && <Badge variant="destructive">Désactivé</Badge>}
              </TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="" />
          </PaginationItem>
          <PaginationItem>
            <Link href="#">1</Link>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <SidebarUserDetail state={[selectedUser, setSelectedUser]} />
    </ManagerLayout>
  )
}
