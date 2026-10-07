import { NewspaperIcon } from 'lucide-react'
import { Navigate, useRoutes } from 'react-router'
import { useAuth } from './context/auth/authContext'
import Login from './features/authentication/login'
import AddMember from './features/team/pages/AddMember'
import Team from './features/team/pages/index'
import TeamMember from './features/team/pages/TeamMember'
import UpdateMember from './features/team/pages/UpdateMember'

//
import Project from './features/projects/pages'
import AddProject from './features/projects/pages/AddProject'
import UpdateProject from './features/projects/pages/UpdateProject'
import Layout from './layout'
import { NavGroup } from './layout/types'

import { routes } from './routes_Apis'

const privateRoutes = [
  {
    path: routes.main,
    element: <Layout />,
    children: [
      {
        title: 'General',
        children: [
          {
            title: 'Team Members',
            icon: NewspaperIcon,
            children: [
              {
                title: 'Add new member',
                path: routes.add_member,
                element: <AddMember />
              },
              {
                title: 'All members',
                path: routes.main,
                element: <Team />
              },
              {
                hide: true,
                title: 'team member detail',
                path: `${routes.team}/:memberId`,
                element: <TeamMember />
              },
              {
                hide: true,
                title: 'edit member',
                path: `${routes.update_member}`,
                element: <UpdateMember />
              }
            ]
          },
          {
            title: 'Projects',
            icon: NewspaperIcon,
            children: [
              {
                title: 'Add new Project',
                path: routes.add_project,
                element: <AddProject />
              },
              {
                title: 'All Projects',
                path: routes.projects,
                element: <Project />
              },

              {
                hide: true,
                title: 'edit project',
                path: `${routes.update_project}`,
                element: <UpdateProject />
              }
            ]
          }
          // {
          //   title: 'Payment',
          //   path: '/payment',
          //   icon: DollarSignIcon,
          //   element: <Payments />
          // },
        ]
      }
    ]
  }
]

const publicRoutes = [
  {
    path: '/',
    element: <Login />
  },

  { path: '*', element: <Navigate to='/' replace /> }
]

export const DashboardMenu = (): NavGroup[] => {
  return privateRoutes[0].children
}

export const RoutesApp = () => {
  console.log('render: RoutesApp')
  const { state: authState } = useAuth()

  return useRoutes(authState.isAuthenticated ? privateRoutes : publicRoutes)
}
