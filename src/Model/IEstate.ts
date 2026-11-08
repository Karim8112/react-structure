import { z } from 'zod'

export interface HouseType {
  _id: string
  name: string
}

export interface House {
  _id: string
  mainImage: string //
  title: string //
  description: string
  city: string
  location: string
  area: number
  roomsCount?: number
  price?: string
  houseType: HouseType //
  images: string[]
}

export interface HouseRequest {
  mainImage: File | string
  title: string
  description: string
  city: string
  location: string
  area: number
  roomsCount?: number
  price?: string
  houseType: string
  images?: (string | File)[]
}

export const HouseFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(30, 'Title must be 30 characters or less'),
  //     quickOverview
  // summary
  description: z.string().min(1, 'description is required'),
  city: z
    .string()
    .min(1, 'city is required')
    .max(30, 'city should be less than 30 letter'),

  location: z
    .string()
    .min(1, 'location is required')
    .max(100, 'location should be less than 100 letter'),

  area: z.coerce.number().min(1, 'area is required'),

  // price?: string
  roomsCount: z.coerce.number().optional(),
  price: z.string().max(30, 'price should be less than 30 letter').optional(),

  houseType: z.string().min(1, 'House Type is required'),

  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
  mainImage: z.union([z.instanceof(File), z.string()])
})

export type HouseFormValues = z.infer<typeof HouseFormSchema>
