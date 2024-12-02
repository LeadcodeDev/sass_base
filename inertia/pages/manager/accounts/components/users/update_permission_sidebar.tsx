import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SnakeToCamelCaseObject, State, UserStatus } from '@/commons/types'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import User from '#models/user'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { permission, toastVariant } from '@/commons/utils'
import {
  UpdateUserFormSchema,
  updateUserValidator,
} from '@/pages/manager/accounts/validators/user_validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserForm } from '@/pages/manager/accounts/components/users/forms/update_user_form'
import { useRole } from '@/hooks/use_role'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserConnexions, useUserPermissions } from '@/hooks/use_user'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AccessTokenDbColumns } from '@adonisjs/auth/types/access_tokens'
import { Badge } from '@/components/ui/badge'
import { DateTime } from 'luxon'
import { Button } from '@/components/ui/button'

type Props = {
  state: State<User | null>
}

export default function UpdateUserSidebar(props: Props) {
  const canBeUsed = useUserPermissions(permission.users('update', true))

  const [selectedUser, setSelectedUser] = props.state
  const roles = useRole({
    limit: 9999999,
    skip: !!selectedUser,
  })

  const connexions = useUserConnexions({
    uid: selectedUser?.uid,
    skip: !selectedUser,
  })

  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserValidator),
    values: {
      firstname: selectedUser?.firstname ?? '',
      lastname: selectedUser?.lastname ?? '',
      email: selectedUser?.email ?? '',
      roles: selectedUser?.roles?.map((role) => role.id.toString()) ?? [],
      structure: [],
      type: selectedUser?.type as unknown as string,
      status: selectedUser?.status
        ? Object.values(UserStatus).find((element) => element === selectedUser?.status)!
        : UserStatus.pending,
    },
  })

  function handleSubmit(values: UpdateUserFormSchema) {
    router.put(`/manager/users/${selectedUser?.uid}`, values, {
      onSuccess: () => {
        setSelectedUser(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'User has been updated.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while updating the user.',
        })
      },
    })
  }

  function handleDeleteTokens() {
    router.delete(`/manager/users/${selectedUser?.uid}/delete-token`, {
      onSuccess: () => {
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Token was deleted.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while deleting the token.',
        })
      },
    })
  }

  function handleDelete() {
    router.delete(`/manager/users/${selectedUser?.uid}`, {
      onSuccess: () => {
        setSelectedUser(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'User has been deleted.',
        })
      },
    })
  }

  const firstname = form.watch('firstname')
  const lastname = form.watch('lastname')

  return (
    <Sheet
      open={!!selectedUser}
      onOpenChange={(state) => {
        if (!state) {
          setSelectedUser(null)
        }
      }}
    >
      <SheetContent className="!p-0">
        <SheetHeader>
          <div className="relative h-16 bg-blue-200">
            <Avatar className="absolute left-5 bottom-0 translate-y-1/2 !size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="pt-10 p-3">
            <SheetTitle>
              {firstname} {lastname}
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>

            <div className="mt-5">
              <Tabs defaultValue="profil" className="w-full">
                <TabsList>
                  <TabsTrigger value="profil">Profil</TabsTrigger>
                  <TabsTrigger value="connexions">Sessions</TabsTrigger>
                </TabsList>
                <TabsContent value="profil">
                  <UpdateUserForm
                    form={form}
                    roles={roles}
                    canBeUsed={canBeUsed}
                    onSubmit={handleSubmit}
                    onDelete={handleDelete}
                  />
                </TabsContent>
                <TabsContent value="connexions">
                  <div className="flex justify-end">
                    <Button onClick={handleDeleteTokens} variant="destructive" size="xs">
                      Clear tokens
                    </Button>
                  </div>
                  <div className="flex items-center hover:bg-gray-50 rounded py-3">
                    <div className="flex justify-between gap-x-2 w-full">
                      <p className="text-sm">Type</p>
                      <div className="flex items-center justify-end gap-x-2">
                        <p className="text-sm">Dernière utilisation</p>
                        <p className="text-sm w-16">Expiration</p>
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="min-h-[50dvh] divide-y">
                    {connexions.map((token, index) => (
                      <TokenRow
                        uid={selectedUser?.uid as string}
                        token={token as unknown as SnakeToCamelCaseObject<AccessTokenDbColumns>}
                        key={index}
                      />
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

function TokenRow(props: { uid: string; token: SnakeToCamelCaseObject<AccessTokenDbColumns> }) {
  function formatDate(value: Date | null) {
    return value
      ? DateTime.fromISO(value as unknown as string).toFormat('dd/MM/yyyy hh:mm:ss')
      : null
  }

  return (
    <div className="flex items-center hover:bg-gray-50 rounded py-3">
      <div className="flex justify-between gap-x-2 w-full">
        <Badge variant="secondary">{props.token.type}</Badge>
        <div className="flex items-center justify-end gap-x-2">
          <p className="text-xs">{formatDate(props.token.lastUsedAt)}</p>
          <p className="text-xs w-16 flex items-center justify-end">
            {props.token.expiresAt ? formatDate(props.token.expiresAt) : 'Never'}
          </p>
        </div>
      </div>
    </div>
  )
}
