import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { State } from '@/commons/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import User from '#models/user'
import LoadFragment from '@/components/commons/load_fragment'

type Props = {
  state: State<User | null>
}

export default function UpdateUserSidebar(props: Props) {
  const [selectedUser, setSelectedUser] = props.state

  return (
    <Sheet
      open={!!selectedUser}
      onOpenChange={(state) => {
        if (!state) {
          setSelectedUser(null)
        }
      }}
    >
      <SheetContent className="!p-0">
        <SheetHeader>
          <div className="relative h-16 bg-blue-200">
            <Avatar className="absolute left-5 bottom-0 translate-y-1/2 !size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="pt-10 p-3">
            <SheetTitle>
              {selectedUser?.firstname} {selectedUser?.lastname}
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>

            <LoadFragment
              source={`/manager/users/${selectedUser?.uid}/edit`}
              props={{ setSelectedUser }}
            />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
