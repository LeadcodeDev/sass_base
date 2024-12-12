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
import { CreateUserFormSchema } from '@/pages/manager/accounts/validators/user_validators'
import Role from '#models/role'
import { UserStatus } from '@/commons/types'
import { Label } from '@/components/ui/label'

type Props = {
  form: UseFormReturn<CreateUserFormSchema>
  roles: Role[]
  canBeUsed: boolean
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
          <FormField
            control={props.form.control}
            name="avatar"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="flex-1">
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5 w-full">
            <FormField
              control={props.form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex-1">
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
                <FormItem className="flex-1">
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" disabled={!props.canBeUsed} {...field} />
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
                  <Input placeholder="john.doe@foo.bar" disabled={!props.canBeUsed} {...field} />
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
                    <Input type="password" disabled={!props.canBeUsed} {...field} />
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
                    <Input type="password" disabled={!props.canBeUsed} {...field} />
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
                        disabled={!props.canBeUsed}
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
                        disabled={!props.canBeUsed}
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
                    disabled={!props.canBeUsed}
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
