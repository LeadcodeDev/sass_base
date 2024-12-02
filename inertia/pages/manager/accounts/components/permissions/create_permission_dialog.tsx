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
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { ReactElement, useState } from 'react'
import {
  CreatePermissionFormSchema,
  createPermissionValidator,
} from '@/pages/manager/accounts/validators/permission_validators'
import { PermissionForm } from '@/pages/manager/accounts/components/permissions/forms/permission_form'
import Protected from '@/components/commons/protected'

type Props = {
  trigger: ReactElement
}

export function CreatePermissionDialog(props: Props) {
  const [open, setOpen] = useState(false)
  const form = useForm<CreatePermissionFormSchema>({
    resolver: zodResolver(createPermissionValidator),
    defaultValues: {
      uid: '',
      label: '',
      description: '',
      forAdmin: false,
    },
  })

  function handleSubmit(values: CreatePermissionFormSchema) {
    router.post(`/manager/permissions`, values, {
      onSuccess: () => {
        setOpen(false)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Permission has been created.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while creating the permission.',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Create new permission</DialogTitle>
          <DialogDescription>Fill in the form to create a new permission.</DialogDescription>
        </DialogHeader>

        <PermissionForm id="form" form={form} onSubmit={handleSubmit} />

        <DialogFooter className="flex items-center sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mt-5">
              Close
            </Button>
          </DialogClose>
          <Protected permissions="manager:permissions:store">
            <Button form="form" type="submit" size="sm" className="mt-5">
              Save
            </Button>
          </Protected>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
