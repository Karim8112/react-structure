import { NewspaperIcon } from 'lucide-react'
import { Navigate, useRoutes } from 'react-router'
import Login from './features/authentication/login'
import AddMember from './features/team/pages/AddMember'
import Team from './features/team/pages/index'
import TeamMember from './features/team/pages/TeamMember'
import UpdateMember from './features/team/pages/UpdateMember'

//
import AddProject from './features/projects/pages/AddProject'
import Project from './features/projects/pages/index2'
import ProjectTypes from './features/projects/pages/ProjectTypes'
import UpdateProject from './features/projects/pages/UpdateProject'

import Layout from './layout'
import { NavGroup } from './layout/types'

import ShowProject from './features/projects/pages/ShowProject'
import Video from './features/videos/pages'
import AddVideo from './features/videos/pages/AddVideo'
import UpdateVideo from './features/videos/pages/UpdateVideo'
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
              },
              {
                hide: true,
                title: 'show project',
                path: `${routes.show_project}/:projectId`,
                element: <ShowProject />
              }
            ]
          },
          {
            title: 'Projects',
            icon: NewspaperIcon,
            children: [
              {
                title: 'Project Types',
                path: routes.project_types,
                element: <ProjectTypes />
              },
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
          },
          {
            title: 'Videos',
            icon: NewspaperIcon,
            children: [
              {
                title: 'Add new Video',
                path: routes.add_video,
                element: <AddVideo />
              },
              {
                title: 'All Videos',
                path: routes.videos,
                element: <Video />
              },

              {
                hide: true,
                title: 'edit project',
                path: `${routes.update_video}`,
                element: <UpdateVideo />
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
  // const { state: authState } = useAuth()
  const token = JSON.parse(localStorage.getItem('token') ?? 'null')
  return useRoutes(token ? privateRoutes : publicRoutes)
}
