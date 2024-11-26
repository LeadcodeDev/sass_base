import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { State } from '@/commons/types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import SelectBox from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import User from '#models/user'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import { Switch } from '@/components/ui/switch'
import { DeleteButton } from '@/components/commons/delete_button'

type Props = {
  state: State<User | null>
}

export default function SidebarUserDetail(props: Props) {
  const [selectedUser, setSelectedUser] = props.state
  const form = useForm({
    values: {
      firstname: selectedUser?.firstname,
      lastname: selectedUser?.lastname,
      email: selectedUser?.email,
      roles: selectedUser?.roles?.map((role) => role.id.toString()) ?? [],
      structure: [],
      type: selectedUser?.type as unknown as string,
      isActive: Boolean(selectedUser?.isActive),
    },
  })

  function handleSubmit(data: { [key: string]: any }) {
    router.put(`/manager/users/${selectedUser?.uid}`, data)
  }

  const firstname = form.watch('firstname')
  const lastname = form.watch('lastname')

  const frameworks = [
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ]

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
              {firstname} {lastname}
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="pt-5 flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="firstname"
                    rules={{ required: 'Firstname is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    rules={{ required: 'Lastname is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@foo.bar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Switch
                            label={(checked) => (checked ? 'Active' : 'Inactive')}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account type</FormLabel>
                        <FormControl>
                          <SelectBox
                            options={[
                              { label: 'Staff', value: 'staff' },
                              { label: 'Practitioner', value: 'practitioner' },
                              { label: 'User', value: 'user' },
                            ]}
                            defaultValue={field.value}
                            onChange={field.onChange}
                            placeholder="Select type..."
                            inputPlaceholder="Search type"
                            emptyPlaceholder="No type found."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roles</FormLabel>
                        <FormControl>
                          <SelectBox
                            options={[{ label: 'Admin', value: 'admin' }]}
                            defaultValue={field.value}
                            onChange={field.onChange}
                            placeholder="Select roles..."
                            inputPlaceholder="Search roles"
                            emptyPlaceholder="No role found."
                            multiple
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="structure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Structure</FormLabel>
                        <FormControl>
                          <SelectBox
                            options={frameworks}
                            defaultValue={field.value}
                            onChange={field.onChange}
                            placeholder="Select a framework..."
                            inputPlaceholder="Search framework"
                            emptyPlaceholder="No framework found."
                            multiple
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button type="submit" size="sm" className="mt-5">
                    Save
                  </Button>
                  <DeleteButton
                    word="confirmation"
                    onSubmit={() => {
                      router.delete(`/manager/users/${selectedUser?.uid}`)
                      setSelectedUser(null)
                    }}
                    variant="destructive"
                    size="sm"
                    className="mt-5"
                  >
                    Supprimer
                  </DeleteButton>
                </div>
              </form>
            </Form>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
