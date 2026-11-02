import { APIs, routes } from '@/routes_Apis'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
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

import MultiImageUploadField from '@/components/MultipleImageUpload'
import { TextArea } from '@/components/ui/textArea'
import PatchAxios from '@/lib/PatchAxios'
import { ThreeDot } from 'react-loading-indicators'
import {
  AboutUsValues,
  AboutUschema,
  IAboutUsRequest
} from '../../../Model/Landing'
import { useAboutUs } from './useAboutUs'

export default function UpdateAboutUs() {
  const navigate = useNavigate()
  const aboutUs = useAboutUs()
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  const form = useForm<AboutUsValues>({
    resolver: zodResolver(AboutUschema)
  })

  useEffect(() => {
    aboutUs.GetData()
  }, [])

  useEffect(() => {
    if (!aboutUs.data?.data) return

    form.reset({
      title1: aboutUs?.data?.data?.[0].title1,
      description: aboutUs?.data?.data?.[0].description,
      title2: aboutUs?.data?.data?.[0].title2,
      description2: aboutUs?.data?.data?.[0].description2,
      title3: aboutUs?.data?.data?.[0].title3,
      description3: aboutUs?.data?.data?.[0].description3,
      images: aboutUs?.data?.data?.[0].images
    })
  }, [aboutUs.data, form.reset])

  const onSubmit = (data: AboutUsValues) => {
    // Sanitize payload by removing blank string entries

    const Files: (File | string)[] = []

    if (data?.images) {
      data.images.forEach(item => {
        Files.push(item)
      })
    }

    const payload: IAboutUsRequest = {
      ...data
    }

    if (Files.length > 0) {
      payload.images = Files // objectToFormData appends each file under 'images'
    }

    PatchAxios<IAboutUsRequest, unknown>({
      objectId: String(aboutUs.data?.data?.[0]._id),
      path: APIs.about_us,
      payload,
      isFormData: true,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess: () => {
        navigate(routes.about_us)
      }
    })
  }

  return !aboutUs.loading ? (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle>Update About Us</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <CardContent className='space-y-4'>
              {/* Title (Required, max 20) */}
              <FormField
                control={form.control}
                name='title1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title 1 *</FormLabel>
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description 1 *</FormLabel>
                    <FormControl>
                      <TextArea
                        placeholder='هذا نص سريع يعرض عند استعراض كل المشاريع'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title 2 *</FormLabel>
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
                name='description2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description 2 *</FormLabel>
                    <FormControl>
                      <TextArea
                        placeholder='هذا نص سريع يعرض عند استعراض كل المشاريع'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title3'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title 3 *</FormLabel>
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
                name='description3'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description 3 *</FormLabel>
                    <FormControl>
                      <TextArea
                        placeholder='هذا نص سريع يعرض عند استعراض كل المشاريع'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* iamges */}
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiImageUploadField
                        width={220}
                        height={160}
                        name='images'
                        label='Images Before'
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
            </CardContent>

            <CardFooter>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? (
                  <ThreeDot
                    color='black'
                    size='small'
                    text=''
                    textColor=''
                    style={{ height: '15px !important' }}
                  />
                ) : (
                  'Save Changes'
                )}
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
  ) : (
    <>
      <div className='mt-10 flex items-center justify-center gap-6'>
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className='h-screen w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800'
          />
        ))}
      </div>
    </>
  )
}
