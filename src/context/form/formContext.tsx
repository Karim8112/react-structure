import { IProject } from '@/Model/IProject'
import ITeam from '@/Model/ITeam'
import IVideo from '@/Model/IVideo'
import React, { ReactNode, createContext, useContext, useState } from 'react'

interface ContextProps {
  member: ITeam | null
  setMember: React.Dispatch<React.SetStateAction<ITeam | null>>
  project: IProject | null
  setProject: React.Dispatch<React.SetStateAction<IProject | null>>
  video: IVideo | null
  setVideo: React.Dispatch<React.SetStateAction<IVideo | null>>
}

const FormContext = createContext<ContextProps | undefined>(undefined)

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [member, setMember] = useState<ITeam | null>(null)
  const [project, setProject] = useState<IProject | null>(null)
  const [video, setVideo] = useState<IVideo | null>(null)
  return (
    <FormContext.Provider
      value={{ member, setMember, project, setProject, video, setVideo }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = (): ContextProps => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }

  return context
}
