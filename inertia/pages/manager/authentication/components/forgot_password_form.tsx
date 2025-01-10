import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {ForgotPasswordFormSchema} from "@/pages/manager/authentication/validators/forgot_password_validator";

type Props = {
  form: UseFormReturn<ForgotPasswordFormSchema>
  onSubmit: (data: ForgotPasswordFormSchema) => void
  actions?: ReactNode
  id?: string
}

export default function ForgotPasswordForm(props: Props) {
  return (
    <Form {...props.form}>
      <form id={props.id} onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="sm" className="mt-5">
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Form>
  )
}
