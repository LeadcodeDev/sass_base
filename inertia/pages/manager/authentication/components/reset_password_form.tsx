
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {ResetPasswordFormSchema} from "@/pages/manager/authentication/validators/reset_password_validator";

type Props = {
  form: UseFormReturn<ResetPasswordFormSchema>
  onSubmit: (data: ResetPasswordFormSchema) => void
  actions?: ReactNode
  id?: string
}

export default function ResetPasswordForm(props: Props) {
  return (
    <Form {...props.form}>
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} type="password"/>
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
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl >
                  <Input {...field} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="sm" className="mt-5">
          Modifier le mot de passe
        </Button>
      </form>
    </Form>
  )
}
