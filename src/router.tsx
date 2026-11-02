import {
  Construction,
  Gem,
  Info,
  LayoutTemplate,
  List,
  PhoneCall,
  Plus,
  Presentation,
  Star,
  UserRoundCog,
  Users,
  Video
} from 'lucide-react'
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

import AdditionalSection from './features/landing/additionalSection'
import Hero from './features/landing/hero'
import WhatWeDo from './features/landing/whatWeDo'
import ShowProject from './features/projects/pages/ShowProject'
import VideoPage from './features/videos/pages'
import AddVideo from './features/videos/pages/AddVideo'
import UpdateVideo from './features/videos/pages/UpdateVideo'
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
            icon: Users,
            children: [
              {
                icon: Plus,
                title: 'Add new member',
                path: routes.add_member,
                element: <AddMember />
              },
              {
                icon: List,
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
            icon: Construction,
            children: [
              {
                icon: Gem,
                title: 'Project Types',
                path: routes.project_types,
                element: <ProjectTypes />
              },
              {
                icon: Plus,
                title: 'Add new Project',
                path: routes.add_project,
                element: <AddProject />
              },
              {
                icon: List,
                title: 'All Projects',
                path: routes.projects,
                element: <Project />
              },
              {
                hide: true,
                title: 'show project',
                path: `${routes.show_project}/:projectId`,
                element: <ShowProject />
              },
              {
                hide: true,
                title: 'edit project',
                path: `${routes.update_project}/:projectId`,
                element: <UpdateProject />
              }
            ]
          },
          {
            title: 'Videos',
            icon: Video,
            children: [
              {
                icon: Plus,
                title: 'Add new Video',
                path: routes.add_video,
                element: <AddVideo />
              },
              {
                icon: List,
                title: 'All Videos',
                path: routes.videos,
                element: <VideoPage />
              },

              {
                hide: true,
                title: 'edit project',
                path: `${routes.update_video}`,
                element: <UpdateVideo />
              }
            ]
          },
          {
            title: 'Landing Page',
            icon: Star,
            children: [
              {
                icon: Presentation,
                title: 'Main Image',
                path: routes.hero,
                element: <Hero />
              },
              {
                icon: UserRoundCog,
                title: 'What we do',
                path: routes.what_we_do,
                element: <WhatWeDo />
              },
              {
                icon: LayoutTemplate,
                title: 'Additional Sections',
                path: routes.additional_section,
                element: <AdditionalSection />
              },
              {
                icon: Info,
                title: 'About Us',
                path: routes.about_us,
                element: <VideoPage />
              },
              {
                icon: List,
                title: 'List',
                path: routes.list,
                element: <VideoPage />
              },
              {
                icon: PhoneCall,
                title: 'Contact Info',
                path: routes.contact_info,
                element: <VideoPage />
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
