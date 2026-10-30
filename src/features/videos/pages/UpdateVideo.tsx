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

import { useFormContext } from '@/context/form/formContext'
import PatchAxios from '@/lib/PatchAxios'
import IVideo, { VideoFormSchema, VideoFormValues } from '@/Model/IVideo'
import { ThreeDot } from 'react-loading-indicators'

export default function UpdateVideo() {
  const { video } = useFormContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: {
      title: video?.title,
      path: video?.path
    }
  })

  async function onSubmit(data: VideoFormValues) {
    // Sanitize payload by removing blank string entries
    const payload: IVideo = {
      ...data
    }

    await PatchAxios<IVideo, unknown>({
      objectId: video?._id as string,
      path: APIs.video,
      payload,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess: () => {
        navigate(routes.videos)
      }
    })
  }

  return (
    <div className='flex min-h-screen items-start justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle>Update Video</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <CardContent className='space-y-4'>
              {/* Title  */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Video name'
                        maxLength={30}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* path */}
              <FormField
                control={form.control}
                name='path'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube URL *</FormLabel>
                    <FormControl>
                      <Input placeholder='Supplement' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic String Lists */}
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
                  'Save'
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
  )
}
