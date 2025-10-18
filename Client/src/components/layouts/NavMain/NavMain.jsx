import { NavLink } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'

function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>🌺 Flower Admin</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className='group/collapsible cursor-pointer'
          >
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
                // className={({ isActive }) => (isActive ? 'bg-[#e56d7a]' : '')}
              >
                <SidebarMenuButton className='cursor-pointer h-[42px]' tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain
