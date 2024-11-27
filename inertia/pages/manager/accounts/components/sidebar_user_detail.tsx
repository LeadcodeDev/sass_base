import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { State } from '@/commons/types'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import User from '#models/user'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import {
  UpdateUserFormSchema,
  updateUserValidator,
} from '@/pages/manager/accounts/validators/user_validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserForm } from '@/pages/manager/accounts/components/forms/update_user_form'

type Props = {
  state: State<User | null>
}

export default function SidebarUserDetail(props: Props) {
  const [selectedUser, setSelectedUser] = props.state
  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserValidator),
    values: {
      firstname: selectedUser?.firstname ?? '',
      lastname: selectedUser?.lastname ?? '',
      email: selectedUser?.email ?? '',
      roles: selectedUser?.roles?.map((role) => role.id.toString()) ?? [],
      structure: [],
      type: selectedUser?.type as unknown as string,
      isActive: Boolean(selectedUser?.isActive),
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

            <UpdateUserForm form={form} onSubmit={handleSubmit} onDelete={handleDelete} />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
