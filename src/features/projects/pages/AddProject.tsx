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

import { IProject } from '@/Model/IProject'
import { ProjectFormSchema, ProjectFormValues } from '../../../Model/IProject'

export default function AddProject() {
  const navigate = useNavigate()
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
      projectType: ''
    }
  })

  async function onSubmit(data: ProjectFormValues) {
    // Sanitize payload by removing blank string entries
    const payload: IProject = {
      ...data,
      projectType: data.projectType as IProject['projectType']
    }

    await PostAxios<IProject, unknown>({
      path: APIs.project,
      payload,
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

              {/* Email (Required, valid email) */}
              <FormField
                control={form.control}
                name='projectType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>project Type *</FormLabel>
                    <FormControl>
                      <Input placeholder='Supplement' {...field} />
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
