import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SelectBox from '@/components/ui/select'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { DeleteButton } from '@/components/commons/delete_button'
import Role from '#models/role'
import { UserStatus } from '@/commons/types'
import Protected from '@/components/commons/protected'
import { permission } from '@/commons/utils'
import { UpdateUserFormSchema } from '@/pages/manager/accounts/users/validators/user_validators'

type Props = {
  form: UseFormReturn<UpdateUserFormSchema>
  roles: Role[]
  canBeUsed: boolean
  onSubmit: (data: UpdateUserFormSchema) => void
  onDelete: () => void
}

export function UpdateUserForm(props: Props) {
  const frameworks = [
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ]

  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="pt-3 flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="John" disabled={!props.canBeUsed} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" disabled={!props.canBeUsed} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@foo.bar" disabled={!props.canBeUsed} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account status</FormLabel>
                <FormControl>
                  <SelectBox
                    options={Object.entries(UserStatus).map(([label, value]) => ({
                      label: label,
                      value: value,
                    }))}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Select status..."
                    inputPlaceholder="Search status"
                    emptyPlaceholder="No status found."
                    disabled={!props.canBeUsed}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account type</FormLabel>
                <FormControl>
                  <SelectBox
                    options={[
                      { label: 'Staff', value: 'staff' },
                      { label: 'Practitioner', value: 'practitioner' },
                      { label: 'User', value: 'user' },
                    ]}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Select type..."
                    inputPlaceholder="Search type"
                    emptyPlaceholder="No type found."
                    disabled={!props.canBeUsed}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles</FormLabel>
                <FormControl>
                  <SelectBox
                    disabled={!props.canBeUsed}
                    options={props.roles.map((role) => ({
                      label: role.name,
                      value: role.id.toString(),
                    }))}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Select roles..."
                    inputPlaceholder="Search roles"
                    emptyPlaceholder="No role found."
                    multiple
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="structure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Structure</FormLabel>
                <FormControl>
                  <SelectBox
                    disabled={!props.canBeUsed}
                    options={frameworks}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Select a framework..."
                    inputPlaceholder="Search framework"
                    emptyPlaceholder="No framework found."
                    multiple
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <UserFormAction onDelete={props.onDelete} />
      </form>
    </Form>
  )
}

function UserFormAction(props: { onDelete: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Protected permissions={permission.users('update', true)}>
        <Button type="submit" size="sm" className="mt-5">
          Save
        </Button>
      </Protected>
      <Protected permissions={permission.users('delete', true)}>
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
    </div>
  )
}
