import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { ReactNode } from 'react'
import { CreateRoleFormSchema, UpdateRoleFormSchema } from '@/pages/manager/accounts/roles/validators/role_validators'
import { Switch } from '@/components/ui/switch'
import Permission from '#models/permission'
import SelectBox from '@/components/ui/select'

type RoleFormSchema = CreateRoleFormSchema | UpdateRoleFormSchema

type Props = {
  form: UseFormReturn<RoleFormSchema>
  permissions: Permission[]
  canBeUsed: boolean
  onSubmit: (data: RoleFormSchema) => void
  actions?: ReactNode
  id?: string
}

export function RoleForm(props: Props) {
  return (
    <Form {...props.form}>
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Role label" disabled={!props.canBeUsed} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain what this role does"
                    className="resize-none"
                    disabled={!props.canBeUsed}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="permissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissions</FormLabel>
                <FormControl>
                  <SelectBox
                    disabled={!props.canBeUsed}
                    options={props.permissions.map((permission) => ({
                      label: permission.label,
                      value: permission.id.toString(),
                    }))}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Select type..."
                    inputPlaceholder="Search type"
                    emptyPlaceholder="No type found."
                    multiple
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="forAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin only</FormLabel>
                <FormControl>
                  <Switch
                    disabled={!props.canBeUsed}
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
        </div>
        {props.actions}
      </form>
    </Form>
  )
}
