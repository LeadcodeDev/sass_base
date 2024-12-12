import { useUserPermissions } from '@/hooks/use_user'
import { permission, toastVariant } from '@/commons/utils'
import { useForm } from 'react-hook-form'
import { CreateUserFormSchema, createUserValidator } from '@/pages/manager/accounts/users/validators/user_validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserStatus } from '@/commons/types'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import Role from '#models/role'
import { Dispatch, SetStateAction } from 'react'
import { CreateUserForm } from '@/pages/manager/accounts/users/components/forms/create_user_form'

type Props = {
  roles: Role[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserCreatePage(props: Props) {
  const canBeUsed = useUserPermissions(permission.users('store', true))

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
    const payload = new FormData()
    payload.append('firstname', values.firstname)
    payload.append('lastname', values.lastname)
    payload.append('email', values.email)
    payload.append('password', values.password)
    payload.append('password_confirmation', values.password_confirmation)
    payload.append('type', values.type)
    payload.append('status', values.status)
    payload.append('avatar', values.avatar)

    values.roles.forEach((role) => payload.append('roles[]', role))
    values.structure.forEach((structure) => payload.append('structure[]', structure))

    router.post(`/manager/users`, payload, {
      preserveState: true,
      onSuccess: () => {
        props.setOpen(false)
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
    <CreateUserForm
      id="form"
      form={form}
      canBeUsed={canBeUsed}
      roles={props.roles}
      onSubmit={handleSubmit}
    />
  )
}
