import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { State } from '@/commons/types'
import { useForm } from 'react-hook-form'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdatePermissionFormSchema,
  updatePermissionValidator,
} from '@/pages/manager/accounts/validators/permission_validators'
import Permission from '#models/permission'
import { PermissionForm } from '@/pages/manager/accounts/components/permissions/forms/permission_form'
import { Button } from '@/components/ui/button'
import { DeleteButton } from '@/components/commons/delete_button'

type Props = {
  state: State<Permission | null>
}

export default function UpdatePermissionSidebar(props: Props) {
  const [selectedPermission, setSelectedPermission] = props.state
  const form = useForm<UpdatePermissionFormSchema>({
    resolver: zodResolver(updatePermissionValidator),
    values: {
      uid: selectedPermission?.uid ?? '',
      label: selectedPermission?.label ?? '',
      description: selectedPermission?.description ?? '',
      forAdmin: Boolean(selectedPermission?.forAdmin),
    },
  })

  function handleSubmit(values: UpdatePermissionFormSchema) {
    router.put(`/manager/permissions/${selectedPermission?.uid}`, values, {
      onSuccess: () => {
        setSelectedPermission(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Permission has been updated.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while updating the permission.',
        })
      },
    })
  }

  function handleDelete() {
    router.delete(`/manager/permissions/${selectedPermission?.uid}`, {
      onSuccess: () => {
        setSelectedPermission(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Permission has been deleted.',
        })
      },
    })
  }

  const label = form.watch('label')

  return (
    <Sheet
      open={!!selectedPermission}
      onOpenChange={(state) => {
        if (state) return
        setSelectedPermission(null)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{label}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
        <PermissionForm
          form={form}
          onSubmit={handleSubmit}
          actions={<PermissionFormAction onDelete={handleDelete} />}
        />
      </SheetContent>
    </Sheet>
  )
}

function PermissionFormAction(props: { onDelete?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Button type="submit" size="sm" className="mt-5">
        Save
      </Button>
      {props.onDelete && (
        <DeleteButton
          word="confirmation"
          onSubmit={props.onDelete}
          variant="destructive"
          size="sm"
          className="mt-5"
        >
          Supprimer
        </DeleteButton>
      )}
    </div>
  )
}
