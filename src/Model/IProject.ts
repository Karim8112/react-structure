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
  Donor?: string
  value?: string
  startDate?: Date
  endDate?: Date
  projectType: ProjectType
}
