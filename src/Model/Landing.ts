import { z } from 'zod'

export interface IHero {
  _id?: string
  heroImage: string
  mainTitle: string
}

export const HeroSchema = z.object({
  mainTitle: z
    .string()
    .min(1, 'Name is required')
    .max(60, 'Title must be 50 characters or less'),
  //     quickOverview
  // summary
  heroImage: z.union([z.instanceof(File), z.string()])
})

export type HeroValues = z.infer<typeof HeroSchema>

// =============================================================================

export interface IWhatWeDo {
  _id?: string
  image: string
  text: string
}

export const WhatWeDoSchema = z.object({
  text: z
    .string()
    .min(1, 'Text is required')
    .max(60, 'Text must be 60 characters or less'),
  //     quickOverview
  // summary
  image: z.union([z.instanceof(File), z.string()])
})

export type WhatWeDoValues = z.infer<typeof WhatWeDoSchema>

// =============================================================================

export interface IAdditionalSection {
  _id?: string
  title: string
  image: string
  text: string
}

export const AdditionalSectionchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(60, 'Title must be 60 characters or less'),
  text: z.string().min(1, 'Text is required'),
  //     quickOverview
  // summary
  image: z.union([z.instanceof(File), z.string()])
})

export type AdditionalSectionValues = z.infer<typeof AdditionalSectionchema>

// =============================================================================

export interface IAboutUs {
  _id?: string
  title1: string
  description: string
  title2: string
  description2: string
  title3: string
  description3: string
  images?: string[]
}

export interface IAboutUsRequest {
  _id?: string
  title1: string
  description: string
  title2: string
  description2: string
  title3: string
  description3: string
  images?: (string | File)[]
}

export const AboutUschema = z.object({
  title1: z
    .string()
    .min(1, 'Title 1 is required')
    .max(60, 'Title must be 60 characters or less'),
  title2: z
    .string()
    .min(1, 'Title 2 is required')
    .max(60, 'Title must be 60 characters or less'),
  title3: z
    .string()
    .min(1, 'Title 3 is required')
    .max(60, 'Title must be 60 characters or less'),
  description: z.string().min(1, 'description 1 is required'),
  description2: z.string().min(1, 'description 1 is required'),
  description3: z.string().min(1, 'description 1 is required'),

  images: z.array(z.union([z.instanceof(File), z.string()])).optional()
})

export type AboutUsValues = z.infer<typeof AboutUschema>

// =============================================================================

export interface IList {
  _id?: string
  image: string
  title: string
  desc: string[]
}

export interface IContactInfo {
  _id?: string
  numbers: string[]
  emails: string[]
  address: string[]
}
