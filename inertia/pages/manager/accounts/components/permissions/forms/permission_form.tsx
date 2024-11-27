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
import { CreatePermissionFormSchema } from '@/pages/manager/accounts/validators/permission_validators'
import { Textarea } from '@/components/ui/textarea'
import { ReactNode } from 'react'

type Props = {
  form: UseFormReturn<CreatePermissionFormSchema>
  onSubmit: (data: CreatePermissionFormSchema) => void
  actions?: ReactNode
  id?: string
}

export function PermissionForm(props: Props) {
  return (
    <Form {...props.form}>
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="pt-5 flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="uid"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Identifier</FormLabel>
                <FormControl>
                  <Input placeholder="domain:resource:action" {...field} />
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
                  <Input placeholder="Permission label" {...field} />
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
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
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
