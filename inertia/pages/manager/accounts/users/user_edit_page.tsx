import { useUserPermissions } from '@/hooks/use_user'
import { permission, toastVariant } from '@/commons/utils'
import { useForm } from 'react-hook-form'
import {
  UpdateUserFormSchema,
  updateUserValidator,
} from '@/pages/manager/accounts/users/validators/user_validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { SnakeToCamelCaseObject, UserStatus } from '@/commons/types'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import Role from '#models/role'
import { Dispatch, SetStateAction } from 'react'
import User from '#models/user'
import { UpdateUserForm } from '@/pages/manager/accounts/users/components/forms/update_user_form'
import { AccessTokenDbColumns } from '@adonisjs/auth/types/access_tokens'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DateTime } from 'luxon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Props = {
  roles: Role[]
  connexions: AccessTokenDbColumns[]
  user: User
  setSelectedUser: Dispatch<SetStateAction<User | null>>
}

export default function UserEditPage(props: Props) {
  const canBeUsed = useUserPermissions(permission.users('update', true))

  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserValidator),
    values: {
      firstname: props.user?.firstname ?? '',
      lastname: props.user?.lastname ?? '',
      email: props.user?.email ?? '',
      roles: props.user?.roles?.map((role) => role.id.toString()) ?? [],
      structure: [],
      type: props.user?.type as unknown as string,
      status: props.user?.status
        ? Object.values(UserStatus).find((element) => element === props.user?.status)!
        : UserStatus.pending,
    },
  })

  function handleSubmit(values: UpdateUserFormSchema) {
    router.put(`/manager/users/${props.user?.uid}`, values, {
      onSuccess: () => {
        props.setSelectedUser(null)
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
    router.delete(`/manager/users/${props.user?.uid}/delete-token`, {
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

  return (
    <div className="mt-5">
      <Tabs defaultValue="profil" className="w-full">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="connexions">Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <UpdateUserForm
            form={form}
            canBeUsed={canBeUsed}
            roles={props.roles}
            onSubmit={handleSubmit}
            onDelete={handleDeleteTokens}
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
            {props.connexions.map((token, index) => (
              <TokenRow
                uid={props.user.uid}
                token={token as unknown as SnakeToCamelCaseObject<AccessTokenDbColumns>}
                key={index}
              />
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
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
