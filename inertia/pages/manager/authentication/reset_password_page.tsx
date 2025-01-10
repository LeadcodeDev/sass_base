import { buttonVariants } from '@/components/ui/button'
import { cn, toastVariant } from '@/commons/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ResetPasswordForm from '@/pages/manager/authentication/components/reset_password_form'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import {ResetPasswordFormSchema, resetPasswordValidator} from '@/pages/manager/authentication/validators/reset_password_validator';
import type User from "#models/user";

type Props = {
  user : User
}

export default function AuthenticationPage(props: Props) {
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      password: '',
      password_confirmation: '',
    }
  })

  function handleSubmit(values: ResetPasswordFormSchema) {
    router.post(`/authentication/reset_password/${props.user.uid}`, values, {
      onSuccess: () => {
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Mot de passe changé.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'Une erreur est survenue lors du changement de mot de passe.',
        })
      },
    })
  }

  return (
    <div className="">
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Forgot Password
        </a>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Mon véto
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and helped me deliver
                stunning designs to my clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Réinitialisation du mot de passe</h1>
              <p className="text-sm text-muted-foreground">
                Veuillez renseigner votre adresse email dont vous avez oublié le mot de passe.
              </p>
            </div>
            <ResetPasswordForm form={form} onSubmit={handleSubmit}/>
            <p className="text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
