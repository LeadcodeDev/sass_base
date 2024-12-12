import { useUserPermissions } from '@/hooks/use_user'
import { permission, toastVariant } from '@/commons/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { RoleForm } from '@/pages/manager/accounts/roles/components/forms/role_form'
import Permission from '#models/permission'
import { Dispatch, SetStateAction } from 'react'
import {
  UpdateRoleFormSchema,
  updateRoleValidator,
} from '@/pages/manager/accounts/roles/validators/role_validators'
import { Button } from '@/components/ui/button'
import Protected from '@/components/commons/protected'
import { DeleteButton } from '@/components/commons/delete_button'
import Role from '#models/role'

type Props = {
  role: Role
  permissions: Permission[]
  setSelectedRole: Dispatch<SetStateAction<Role | null>>
}

export default function RoleEditPage(props: Props) {
  const canBeUsed = useUserPermissions(permission.roles('update', true))

  const form = useForm<UpdateRoleFormSchema>({
    resolver: zodResolver(updateRoleValidator),
    values: {
      name: props.role.name ?? '',
      description: props.role?.description ?? '',
      forAdmin: props.role?.forAdmin ?? false,
      permissions: props.role?.permissions.map((permission) => permission.id.toString()) ?? [],
    },
  })

  function handleSubmit(values: UpdateRoleFormSchema) {
    router.put(`/manager/roles/${props.role.uid}`, values, {
      onSuccess: () => {
        props.setSelectedRole(null)
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
    router.delete(`/manager/roles/${props.role.uid}`, {
      onSuccess: () => {
        props.setSelectedRole(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Role has been deleted.',
        })
      },
    })
  }

  return (
    <div className="mt-5">
      <RoleForm
        form={form}
        canBeUsed={canBeUsed}
        permissions={props.permissions}
        onSubmit={handleSubmit}
        actions={<PermissionFormAction onDelete={handleDelete} />}
      />
    </div>
  )
}

function PermissionFormAction(props: { onDelete?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Protected permissions={permission.roles('update', true)}>
        <Button type="submit" size="sm" className="mt-5">
          Save
        </Button>
      </Protected>
      {props.onDelete && (
        <Protected permissions={permission.roles('delete', true)}>
          <DeleteButton
            word="confirmation"
            onSubmit={props.onDelete}
            variant="destructive"
            size="sm"
            className="mt-5"
          >
            Supprimer
          </DeleteButton>
        </Protected>
      )}
    </div>
  )
}
