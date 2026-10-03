import { useAuth } from '@/context/auth/authContext'
import { DashboardMenu } from '@/router'
import { Command } from 'lucide-react'
import { NavGroup, NavItem, type ISidebarData } from '../types'

export const SidebarData = (): ISidebarData => {
  const routes = DashboardMenu()
  const { state } = useAuth()

  type NavGroups = NavGroup[]

  function removeHiddenItems(navGroups: NavGroups): NavGroups {
    function filterItems(items: NavItem[]): NavItem[] {
      return items
        .map(item => {
          if (item?.children) {
            const filteredChildren = filterItems(item.children)
            return { ...item, children: filteredChildren }
          }
          return item
        })
        .filter(item => !item.hide) as NavItem[]
    }

    return navGroups.map(group => ({
      ...group,
      children: filterItems(group.children)
    }))
  }

  return {
    user: {
      name: state.User?.name as string,
      userName: state.User?.userName as string
    },
    app: {
      name: 'AARAN Company',
      logo: Command,
      plan: 'Admin'
    },
    navGroups: removeHiddenItems(routes)
  }
}
