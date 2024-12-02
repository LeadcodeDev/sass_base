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
import { UseFormReturn } from 'react-hook-form'
import {
  CreatePermissionFormSchema,
  UpdatePermissionFormSchema,
} from '@/pages/manager/accounts/validators/permission_validators'
import { Textarea } from '@/components/ui/textarea'
import { ReactNode } from 'react'
import { useUserPermissions } from '@/hooks/use_user'

type PermissionFormSchema = CreatePermissionFormSchema | UpdatePermissionFormSchema

type Props = {
  form: UseFormReturn<PermissionFormSchema>
  onSubmit: (data: PermissionFormSchema) => void
  actions?: ReactNode
  id?: string
}

export function PermissionForm(props: Props) {
  const canBeStore = useUserPermissions('manager:permissions:store')

  return (
    <Form {...props.form}>
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="uid"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Identifier</FormLabel>
                <FormControl>
                  <Input placeholder="domain:resource:action" disabled={!canBeStore} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={props.form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Permission label" disabled={!canBeStore} {...field} />
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
                    placeholder="Explain what this permission does"
                    className="resize-none"
                    disabled={!canBeStore}
                    {...field}
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
                    labelBuilder={(checked) => (checked ? 'Active' : 'Inactive')}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!canBeStore}
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
