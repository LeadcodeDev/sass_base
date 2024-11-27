import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Loader2Icon, TrashIcon } from 'lucide-react'

enum Step {
  initial,
  requestConfirmation,
  wordConfirmation,
  pendingDelete,
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    onSubmit: (event: MouseEvent) => void
    onStepChange?: (step: Step) => void
    word?: string
  }

export function DeleteButton({onStepChange, ...props }: Props) {
  const [step, setStep] = useState<Step>(Step.initial)
  const [word, setWord] = useState<string>('')

  useEffect(() => {
    if (!onStepChange) return
    onStepChange(step)
  }, [step])

  return (
    <Fragment>
      {step === Step.initial && (
        <Button onClick={() => setStep(Step.requestConfirmation)} {...props}>
          Delete
        </Button>
      )}
      {step === Step.requestConfirmation && (
        <Button onClick={() => setStep(Step.wordConfirmation)} {...props}>
          Confirm ?
        </Button>
      )}
      {step === Step.wordConfirmation && (
        <Button disabled onClick={() => setStep(Step.wordConfirmation)} {...props}>
          <Loader2Icon className="animate-spin" />
          Waiting confirmation
        </Button>
      )}

      <Dialog open={step === Step.wordConfirmation} onOpenChange={() => setStep(Step.initial)}>
        <DialogContent background={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogDescription>
              Please report the following code to confirm the deletion
              <pre className="mt-2">
                <code className="px-1 py-0.5 border border-input rounded">
                  {props.word ?? 'confirmation'}
                </code>
              </pre>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                onChange={({ target }) => setWord(target.value)}
                placeholder="Report confirmation code"
              />
            </div>
          </div>
          <DialogFooter className="flex sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm">
                Close
              </Button>
            </DialogClose>

            <Button
              onClick={(event) => {
                setStep(Step.pendingDelete)
                props.onSubmit(event)
              }}
              disabled={word !== (props.word ?? 'confirmation')}
              type="button"
              variant="destructive"
              size="sm"
            >
              <TrashIcon className="size-2" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
