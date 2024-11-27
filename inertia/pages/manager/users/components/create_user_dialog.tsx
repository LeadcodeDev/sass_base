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
  CreateUserFormSchema, createUserValidator,
  UpdateUserFormSchema,
} from '@/pages/manager/users/validators/user_validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { ReactElement, useState } from 'react'
import { CreateUserForm } from '@/pages/manager/users/components/forms/create_user_form'

type Props = {
  trigger: ReactElement
}

export function CreateUserDialog(props: Props) {
  const [open, setOpen] = useState(false)
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
      isActive: true,
    },
  })

  function handleSubmit(values: UpdateUserFormSchema) {
    router.post(`/manager/users`, values, {
      onSuccess: () => {
        setOpen(false)
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>

        <CreateUserForm id="form" form={form} onSubmit={handleSubmit} />

        <DialogFooter className="flex items-center sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mt-5">
              Close
            </Button>
          </DialogClose>
          <Button form="form" type="submit" size="sm" className="mt-5">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
