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
import { Button } from '@/components/ui/button'
import { DeleteButton } from '@/components/commons/delete_button'
import Role from '#models/role'
import {
  UpdateRoleFormSchema,
  updateRoleValidator,
} from '@/pages/manager/accounts/validators/role_validators'
import { RoleForm } from '@/pages/manager/accounts/components/roles/forms/role_form'
import { usePermission } from '@/hooks/use_permission'

type Props = {
  state: State<Role | null>
}

export default function UpdatePermissionSidebar(props: Props) {
  const [selectedRole, setSelectedRole] = props.state
  const permissions = usePermission({
    limit: 9999999,
  })

  const form = useForm<UpdateRoleFormSchema>({
    resolver: zodResolver(updateRoleValidator),
    values: {
      name: selectedRole?.name ?? '',
      description: selectedRole?.description ?? '',
      forAdmin: selectedRole?.forAdmin ?? false,
      permissions: selectedRole?.permissions.map((permission) => permission.id.toString()) ?? [],
    },
  })

  function handleSubmit(values: UpdateRoleFormSchema) {
    router.put(`/manager/roles/${selectedRole?.uid}`, values, {
      onSuccess: () => {
        setSelectedRole(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Role has been updated.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while updating the role.',
        })
      },
    })
  }

  function handleDelete() {
    router.delete(`/manager/roles/${selectedRole?.uid}`, {
      onSuccess: () => {
        setSelectedRole(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Role has been deleted.',
        })
      },
    })
  }

  const name = form.watch('name')

  return (
    <Sheet
      open={!!selectedRole}
      onOpenChange={(state) => {
        if (state) return
        setSelectedRole(null)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
        <RoleForm
          form={form}
          permissions={permissions}
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
