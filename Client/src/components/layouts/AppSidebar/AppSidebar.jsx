import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  SidebarMenuButton,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '~/components/ui/sidebar'
import NavMain from '~/components/layouts/NavMain'
import NavProjects from '~/components/layouts/NavProjects'
import NavUser from '~/components/layouts/NavUser'
import { ROUTES, sidebarMenu } from '~/constants'

function AppSidebar(props) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenuButton size='lg'>
          <Link to={ROUTES.HOME} className='flex items-center justify-start space-x-2 group'>
            <Heart className='h-8 w-8 text-primary fill-current group-hover:scale-110 group-hover:rotate-12 transition-all duration-300' />
            <div>
              <h1 className='font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300'>
                Nuvexa
              </h1>
              <p className='text-xs text-muted-foreground -mt-1'>Luxury Flowers</p>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenu.navMain} />
        <NavProjects projects={sidebarMenu.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
