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

type PermissionFormSchema = CreatePermissionFormSchema | UpdatePermissionFormSchema

type Props = {
  form: UseFormReturn<PermissionFormSchema>
  canBeUsed: boolean
  onSubmit: (data: PermissionFormSchema) => void
  actions?: ReactNode
  id?: string
}

export function PermissionForm(props: Props) {
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
                  <Input
                    placeholder="domain:resource:action"
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
            name="label"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Permission label" disabled={!props.canBeUsed} {...field} />
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
            name="forAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin only</FormLabel>
                <FormControl>
                  <Switch
                    labelBuilder={(checked) => (checked ? 'Active' : 'Inactive')}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!props.canBeUsed}
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
