import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import SelectBox from '@/components/ui/select'
import { UseFormReturn } from 'react-hook-form'
import { CreateUserFormSchema } from '@/pages/manager/accounts/validators/user_validators'
import Role from '#models/role'

type Props = {
  form: UseFormReturn<CreateUserFormSchema>
  roles: Role[]
  onSubmit: (data: CreateUserFormSchema) => void
  id?: string
}

export function CreateUserForm(props: Props) {
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
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="pt-5 flex flex-col gap-5">
          <div className="flex gap-5 w-full">
            <FormField
              control={props.form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={props.form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={props.form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@foo.bar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-5">
            <FormField
              control={props.form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={props.form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Password confirmation</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 w-full">
            <div>
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={props.form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>
                    <FormControl>
                      <SelectBox
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
            </div>
          </div>

          <FormField
            control={props.form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account status</FormLabel>
                <FormControl>
                  <Switch
                    labelBuilder={(checked) => (checked ? 'Active' : 'Inactive')}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
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
      </form>
    </Form>
  )
}
