import { ComponentProps, Fragment, PropsWithChildren, ReactNode } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Toaster } from '@/components/ui/sonner'

const links = [
  {
    title: 'Manage accounts',
    items: [
      { title: 'Users', url: '/manager/users/overview' },
      { title: 'Roles', url: '/manager/roles/overview' },
      { title: 'Permissions', url: '/manager/permissions/overview' },
    ],
  },
  {
    title: 'Manage organizations',
    items: [
      { title: 'Groups', url: '#' },
      { title: 'Structures', url: '#' },
    ],
  },
]

type Props = {
  breadcrumb?: { label: string; url?: string }[]
  trailing?: ReactNode
}

export function ManagerLayout(props: PropsWithChildren<Props>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky z-10 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {props.breadcrumb && (
            <Fragment>
              <Separator orientation="vertical" className="mr-2 !h-6" />
              <Breadcrumb>
                <BreadcrumbList>
                  {props.breadcrumb.map((item, index) => {
                    if (index === props.breadcrumb!.length - 1) {
                      return (
                        <BreadcrumbItem key={index}>
                          <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                        </BreadcrumbItem>
                      )
                    }

                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href={item.url} className="font-medium">{item.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </Fragment>
          )}

          {props.trailing && (
            <div className="flex-1 items-center w-full">
              {props.trailing}
            </div>
          )}
        </header>
        {props.children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}

function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4 pt-4">
        <p className="text-lg font-bold">Manager</p>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {links.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  <span className="text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={false}>
                          <Link href={item.url} className="font-medium">{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
