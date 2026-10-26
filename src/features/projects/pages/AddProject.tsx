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

import ImageUploadField from '@/components/imageUpload'
import MultiImageUploadField from '@/components/MultipleImageUpload'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { IProjectRequest } from '@/Model/IProject'
import { ProjectFormSchema, ProjectFormValues } from '../../../Model/IProject'
import { useProjectTypes } from '../hooks/useProjectType'

export default function AddProject() {
  const navigate = useNavigate()
  const ProjectTypes = useProjectTypes()
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: '',
      donor: '',
      value: '',
      startDate: '',
      endDate: '',
      projectType: '',
      images: [],
      mainImage: undefined
    }
  })

  async function onSubmit(data: ProjectFormValues) {
    // Sanitize payload by removing blank string entries

    const Files: File[] = []

    if (data?.images) {
      data.images.forEach(item => {
        if (item instanceof File) {
          Files.push(item)
        }
      })
    }
    const payload: IProjectRequest = {
      ...data
    }

    if (Files.length > 0) {
      payload.images = Files // objectToFormData appends each file under 'images'
    }

    await PostAxios<IProjectRequest, unknown>({
      path: APIs.project,
      payload,
      isFormData: true,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess: () => {
        navigate(routes.projects)
      }
    })
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <CardContent className='space-y-4'>
              {/* Title (Required, max 20) */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Project name'
                        maxLength={30}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='mainImage'
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

              {/* Email (Required, valid email) */}
              <FormField
                control={form.control}
                name='projectType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>project Type *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ''}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='select project type'></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {ProjectTypes.loading
                              ? '...Loading'
                              : ProjectTypes.data?.data.map(projectType => (
                                  <SelectItem
                                    key={projectType._id}
                                    value={projectType._id}
                                  >
                                    {projectType.name}
                                  </SelectItem>
                                ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address (Optional, max 100) */}
              <FormField
                control={form.control}
                name='donor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donor </FormLabel>
                    <FormControl>
                      <Input placeholder='Unicef' maxLength={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary (Required) */}
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <Input placeholder='2018/05/20' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <Input placeholder='2020/05/20' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='value'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder='300 $' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* upload images */}
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiImageUploadField
                        name='images'
                        label='Project Image Gallery'
                        value={field.value}
                        onChange={files => field.onChange(files)}
                        maxFiles={10}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic String Lists */}
            </CardContent>

            <CardFooter>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Submitting...' : 'Create'}
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
