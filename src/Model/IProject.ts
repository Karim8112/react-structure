import { z } from 'zod'

export interface ProjectType {
  _id: string
  name: string
}

export interface IProject {
  _id?: string
  name: string
  donor?: string
  value?: string
  startDate?: string
  endDate?: string
  projectType: ProjectType
  images?: File[]
  mainImage: File
}

export interface IProjectRequest {
  _id?: string
  name: string
  donor?: string
  value?: string
  startDate?: string
  endDate?: string
  projectType: string
  images?: File[]
  mainImage: File
}

export const ProjectFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(30, 'Title must be 30 characters or less'),
  donor: z
    .string()
    .max(30, 'Donor name must be 30 characters or less')
    .optional()
    .or(z.literal('')),

  value: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  projectType: z.string().min(1, 'Project Type is required'),
  images: z.array(z.instanceof(File)).optional(),
  mainImage: z.instanceof(File)
})

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>
