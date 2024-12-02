import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'
import { LoginFormSchema } from '@/pages/manager/authentication/validators/login_validator'
import { Button } from '@/components/ui/button'

type Props = {
  form: UseFormReturn<LoginFormSchema>
  onSubmit: (data: LoginFormSchema) => void
  actions?: ReactNode
  id?: string
}

export default function LoginForm(props: Props) {
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

          <FormField
            control={props.form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="sm" className="mt-5">
          Connexion
        </Button>
      </form>
    </Form>
  )
}
