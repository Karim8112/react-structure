export type ProjectType =
  | 'Supplement'
  | 'Rehabilitation'
  | 'Arch. Restoration'
  | 'Sewage Replacement'
  | 'Schools Rehab'
  | 'Water Supply'
  | 'Supply'
  | 'Rehab/Solar'
  | 'Infrastructure'

export interface IProject {
  _id: number
  name: string
  donor?: string
  value?: string
  startDate?: string
  endDate?: string
  projectType: ProjectType
}
