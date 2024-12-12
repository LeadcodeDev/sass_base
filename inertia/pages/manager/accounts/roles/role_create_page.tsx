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
  CreateRoleFormSchema,
  createRoleValidator,
} from '@/pages/manager/accounts/roles/validators/role_validators'

type Props = {
  permissions: Permission[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function RoleCreatePage(props: Props) {
  const canBeUsed = useUserPermissions(permission.roles('store', true))

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
        props.setOpen(false)
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
    <RoleForm
      id="form"
      form={form}
      canBeUsed={canBeUsed}
      permissions={props.permissions}
      onSubmit={handleSubmit}
    />
  )
}
