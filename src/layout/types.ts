import IUser from '@/Model/IUser'
import { LucideIcon } from 'lucide-react'

interface App {
  name: string
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: LucideIcon
  hide?: boolean
}

type NavLink = BaseNavItem & {
  path: string
  children?: never
}

type NavCollapsible = BaseNavItem & {
  children: (BaseNavItem & { path: string })[]
  path?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  children: NavItem[]
}

interface ISidebarData {
  user: IUser
  app: App
  navGroups: NavGroup[]
}

export type { ISidebarData, NavCollapsible, NavGroup, NavItem, NavLink }
