import PostAxios from '@/lib/PostAxios'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth/authContext'
import { zodResolver } from '@hookform/resolvers/zod'
import Snackbar from '@mui/joy/Snackbar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { IUserLoginRequest, IUserLoginResponse } from '@/Model/IUser'
import { APIs, routes } from '../../routes_Apis'

const FormSchema = z.object({
  userName: z.string(),
  password: z.string()
})

export default function Login() {
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: '',
      password: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await PostAxios<IUserLoginRequest, IUserLoginResponse>({
      path: APIs.login,
      payload: { userName: data.userName, password: data.password },
      setLoading,
      setSnackbarmsg: setSnackbarmsg,
      setSnackbarOpen: setSnackbarOpen,
      setSnackbarColor: setSnackbarColor,
      onSuccess: data => {
        const token = data.token
        console.log(`this is data token inside on success:`, token)
        dispatch({
          type: 'login',
          token: token,
          user: {
            id: String(data.user.id),
            name: data.user.name,
            userName: data.user.userName
          }
        })
        navigate(routes.main)
      }
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-full max-w-sm pt-6 md:max-w-xl'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='userName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
              <Button type='submit' className='w-full'>
                {loading ? 'Loading...' : 'Login'}
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
        // color={color}
        onClose={() => {
          setSnackbarOpen(false)
        }}
      >
        {snackbarmsg}
      </Snackbar>
    </div>
  )
}
