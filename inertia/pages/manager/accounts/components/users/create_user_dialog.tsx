import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  CreateUserFormSchema,
  createUserValidator,
} from '@/pages/manager/accounts/validators/user_validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { ReactElement, useState } from 'react'
import { CreateUserForm } from '@/pages/manager/accounts/components/users/forms/create_user_form'
import { useRole } from '@/hooks/use_role'
import { UserStatus } from '@/commons/types'
import Protected from '@/components/commons/protected'
import { useUserPermissions } from '@/hooks/use_user'

type Props = {
  trigger: ReactElement
}

export function CreateUserDialog(props: Props) {
  const canBeUsed = useUserPermissions('manager:users:store')

  const [open, setOpen] = useState(false)
  const roles = useRole({
    limit: 9999999,
    skip: !open,
  })

  const form = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserValidator),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      roles: [],
      structure: [],
      type: 'user',
      status: UserStatus.pending,
    },
  })

  function handleSubmit(values: CreateUserFormSchema) {
    router.post(`/manager/users`, values, {
      preserveState: true,
      onSuccess: () => {
        setOpen(false)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'User has been created.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while creating the user.',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
          <DialogDescription>Fill in the form to create a new user.</DialogDescription>
        </DialogHeader>

        <CreateUserForm
          id="form"
          form={form}
          canBeUsed={canBeUsed}
          roles={roles}
          onSubmit={handleSubmit}
        />

        <DialogFooter className="flex items-center sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mt-5">
              Close
            </Button>
          </DialogClose>
          <Protected permissions="manager:users:store">
            <Button form="form" type="submit" size="sm" className="mt-5">
              Save
            </Button>
          </Protected>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
