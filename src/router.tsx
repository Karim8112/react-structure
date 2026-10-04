import { NewspaperIcon } from 'lucide-react'
import { Navigate, useRoutes } from 'react-router'
import { useAuth } from './context/auth/authContext'
import Login from './features/authentication/login'
import Layout from './layout'
import { NavGroup } from './layout/types'
// import Register from './features/authentication/register'
import Projects from './features/projects'
import AddUpdateMember from './features/team/pages/AddUpdateMember'
import Team from './features/team/pages/index'
import TeamMember from './features/team/pages/TeamMember'

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
                path: routes.add_update_member,
                element: <AddUpdateMember />
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
              }
            ]
          },
          {
            title: 'Projects',
            icon: NewspaperIcon,
            children: [
              {
                title: 'Add new',
                path: routes.add_update_project
                // element: <PostDetail />
              },
              {
                title: 'All Projects',
                path: routes.projects,
                element: <Projects />
              },
              {
                hide: true,
                title: 'project detail',
                path: `${routes.projects}/:projectId`
                // element: <Projects />
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
