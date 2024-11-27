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
  CreateRoleFormSchema,
  createRoleValidator,
} from '@/pages/manager/accounts/validators/role_validators'
import { RoleForm } from '@/pages/manager/accounts/components/roles/forms/role_form'
import { usePermission } from '@/hooks/use_permission'

type Props = {
  trigger: ReactElement
}

export function CreateRoleDialog(props: Props) {
  const [open, setOpen] = useState(false)
  const permissions = usePermission({
    limit: 9999999,
    skip: !open,
  })

  const form = useForm<CreateRoleFormSchema>({
    resolver: zodResolver(createRoleValidator),
    defaultValues: {
      name: '',
      description: '',
      forAdmin: false,
      permissions: [],
    },
  })

  function handleSubmit(values: CreateRoleFormSchema) {
    router.post(`/manager/roles`, values, {
      onSuccess: () => {
        setOpen(false)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Role has been created.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while creating the role.',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Create new role</DialogTitle>
          <DialogDescription>Fill in the form to create a new role.</DialogDescription>
        </DialogHeader>

        <RoleForm id="form" form={form} permissions={permissions} onSubmit={handleSubmit} />

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
