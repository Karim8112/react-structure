import IUser from '@/Model/IUser'
import { DashboardMenu } from '@/router'
import { Command } from 'lucide-react'
import { NavGroup, NavItem, type ISidebarData } from '../types'

export const SidebarData = (): ISidebarData => {
  const routes = DashboardMenu()
  // const { state } = useAuth()
  const userObject: IUser = JSON.parse(localStorage.getItem('user') || 'null')

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
      name: userObject.name,
      userName: userObject.userName
    },
    app: {
      name: 'AARAN Company',
      logo: Command,
      plan: 'Admin'
    },
    navGroups: removeHiddenItems(routes)
  }
}
