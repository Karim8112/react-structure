import PostAxios from '@/lib/PostAxios'
import { APIs, routes } from '@/routes_Apis'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Snackbar from '@mui/joy/Snackbar'

import { DynamicExperienceList } from '@/components/DynamicExp'
import ImageUploadField from '@/components/imageUpload'
import { DynamicStringList } from '../../../components/DynamicStringList'
import { TeamFormSchema, TeamFormValues } from '../../../Model/ITeam'

export default function AddMember() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(TeamFormSchema),
    defaultValues: {
      title: '',
      address: '',
      email: '',
      summary: '',
      imageLeft: '',
      imageRight: '',
      phoneNumberS: [],
      tags: [],
      skills: [],
      education: [],
      languages: [],
      experience: []
    }
  })

  async function onSubmit(data: TeamFormValues) {
    // Sanitize payload by removing blank string entries
    const payload: Record<string, unknown> = {
      ...data,
      phoneNumberS: data.phoneNumberS.filter(Boolean),
      tags: data.tags.filter(Boolean),
      skills: data.skills.filter(Boolean),
      education: data.education.filter(Boolean),
      languages: data.languages.filter(Boolean)
    }

    // Only pass image files if they are newly selected Files;
    // if left as empty strings/null, delete keys to prevent empty values in FormData
    if (!(payload.imageLeft instanceof File)) {
      delete payload.imageLeft
    }
    if (!(payload.imageRight instanceof File)) {
      delete payload.imageRight
    }

    await PostAxios<Record<string, unknown>, unknown>({
      path: APIs.team,
      payload,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      isFormData: true, // Activates multipart/form-data with objectToFormData
      onSuccess: () => {
        navigate(routes.main)
      }
    })
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle>Create New Member</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <CardContent className='space-y-6'>
              {/* ========================================================= */}
              {/* 1. VISUAL ASSETS SECTION: imageLeft & imageRight          */}
              {/* ========================================================= */}
              <div className='space-y-3 rounded-xl'>
                <p className='text-xs text-slate-500'>
                  Select portrait images (max 5MB each). Changes overwrite
                  previous Cloudinary files.
                </p>

                <div className='flex flex-wrap items-start gap-6 pt-1'>
                  {/* Left Image Upload */}
                  <FormField
                    control={form.control}
                    name='imageLeft'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUploadField
                            name='imageLeft'
                            label='Left Image (Profile / Main)'
                            value={field.value}
                            onChange={file => field.onChange(file)}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Right Image Upload */}
                  <FormField
                    control={form.control}
                    name='imageRight'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUploadField
                            name='imageRight'
                            label='Right Image (Badge / Secondary)'
                            value={field.value}
                            onChange={file => field.onChange(file)}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* ========================================================= */}
              {/* 2. TEXT FIELDS SECTION                                    */}
              {/* ========================================================= */}

              {/* Title (Required, max 20) */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Team title'
                        maxLength={20}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email (Required, valid email) */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='example@domain.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address (Optional, max 100) */}
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Address location'
                        maxLength={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary (Required) */}
              <FormField
                control={form.control}
                name='summary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary *</FormLabel>
                    <FormControl>
                      <Input placeholder='Brief summary...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic String Lists */}
              <div className='grid grid-cols-1 gap-4 pt-2 md:grid-cols-2'>
                <DynamicStringList
                  form={form}
                  name='phoneNumberS'
                  label='Phone Numbers'
                  placeholder='+123456789'
                />
                <DynamicStringList
                  form={form}
                  name='tags'
                  label='Tags'
                  placeholder='e.g. Frontend'
                />
                <DynamicStringList
                  form={form}
                  name='skills'
                  label='Skills'
                  placeholder='e.g. React'
                />
                <DynamicStringList
                  form={form}
                  name='languages'
                  label='Languages'
                  placeholder='e.g. English'
                />
              </div>

              <DynamicStringList
                form={form}
                name='education'
                label='Education'
                placeholder='Degree or Certification'
              />

              {/* Dynamic Object Array for Experience */}
              <DynamicExperienceList form={form} />
            </CardContent>

            <CardFooter>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Submitting...' : 'Create Member'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Snackbar
        variant='outlined'
        color={snackbarColor}
        autoHideDuration={4000}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      >
        {snackbarmsg}
      </Snackbar>
    </div>
  )
}
