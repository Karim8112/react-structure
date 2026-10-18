import { z } from 'zod'

export default interface IVideo {
  _id?: string
  title: string
  path: string
}
export const VideoFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title must be 20 characters or less'),
  path: z
    .string()
    .min(1, 'Path is required')
    .max(100, 'path name must be 100 characters or less')
})

export type VideoFormValues = z.infer<typeof VideoFormSchema>
