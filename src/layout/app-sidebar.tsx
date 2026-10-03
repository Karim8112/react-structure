import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import IUser from '@/Model/IUser'
import { NavGroup } from '../layout/nav-group'
import { NavUser } from '../layout/nav-user'
import { SidebarData } from './data/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebarData = SidebarData()

  const userInfo: IUser = {
    ...sidebarData.user,
    userName: sidebarData.user.userName,
    name: sidebarData.user.name
  }

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <sidebarData.app.logo className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {sidebarData.app.name}
                </span>
                <span className='truncate text-xs'>{sidebarData.app.plan}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
