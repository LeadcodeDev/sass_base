import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { State } from '@/commons/types'
import Role from '#models/role'
import LoadFragment from '@/components/commons/load_fragment'

type Props = {
  state: State<Role | null>
}

export default function UpdateRoleSidebar(props: Props) {
  const [selectedRole, setSelectedRole] = props.state

  return (
    <Sheet
      open={!!selectedRole}
      onOpenChange={(state) => {
        if (state) return
        setSelectedRole(null)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{selectedRole?.name}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-5">
          <LoadFragment
            source={`/manager/roles/${selectedRole?.uid}/edit`}
            props={{ setSelectedRole }}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
