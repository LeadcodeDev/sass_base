import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { permission } from '@/commons/utils'
import { ReactElement, useState } from 'react'
import Protected from '@/components/commons/protected'
import LoadFragment from '@/components/commons/load_fragment'

type Props = {
  trigger: ReactElement
}

export function CreateRoleDialog(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Create new role</DialogTitle>
          <DialogDescription>Fill in the form to create a new role.</DialogDescription>
        </DialogHeader>

        <LoadFragment source="/manager/roles/create" props={{ setOpen }} />

        <DialogFooter className="flex items-center sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mt-5">
              Close
            </Button>
          </DialogClose>
          <Protected permissions={permission.roles('store', true)}>
            <Button form="form" type="submit" size="sm" className="mt-5">
              Save
            </Button>
          </Protected>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
