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
import { TextArea } from '@/components/ui/textArea'
import { HouseFormSchema, HouseFormValues, HouseRequest } from '@/Model/IEstate'
import { ThreeDot } from 'react-loading-indicators'
import { useHouseTypes } from '../hooks/useHouseType'

export default function AddHouse() {
  const navigate = useNavigate()
  const HouseTypes = useHouseTypes({})
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const form = useForm<HouseFormValues>({
    resolver: zodResolver(HouseFormSchema),
    defaultValues: {
      title: '',
      description: '',
      city: '',
      location: '',
      area: 1,
      roomsCount: 1,
      price: '',
      mainImage: undefined,
      images: [],
      houseType: ''
    }
  })

  async function onSubmit(data: HouseFormValues) {
    // Sanitize payload by removing blank string entries

    const Files: File[] = []

    if (data?.images) {
      data.images.forEach(item => {
        if (item instanceof File) {
          Files.push(item)
        }
      })
    }

    const payload: HouseRequest = {
      ...data
    }

    if (Files.length > 0) {
      payload.images = Files // objectToFormData appends each file under 'images'
    }

    await PostAxios<HouseRequest, unknown>({
      path: APIs.house,
      payload,
      isFormData: true,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess: () => {
        navigate(routes.houses)
      }
    })
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle>Create New Estate</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='mainImage'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploadField
                        isRequired={true}
                        width={400}
                        name='main estate image'
                        label='Estate Image'
                        value={field.value}
                        onChange={file => field.onChange(file)}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title (Required, max 20) */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='House Title'
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
                name='houseType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>house Type *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ''}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='select Estate type'></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {HouseTypes.loading
                              ? '...Loading'
                              : HouseTypes.data?.data.map(houseType => (
                                  <SelectItem
                                    key={houseType._id}
                                    value={houseType._id}
                                  >
                                    {houseType.name}
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
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City </FormLabel>
                    <FormControl>
                      <Input placeholder='Aleppo' maxLength={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Al-Furqan neighborhood'
                        maxLength={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='area'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area </FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='roomsCount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rooms Count </FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price </FormLabel>
                    <FormControl>
                      <Input placeholder='1' {...field} />
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
                        width={220}
                        height={160}
                        name='images'
                        label='Images '
                        value={field.value}
                        onChange={files => field.onChange(files)}
                        maxFiles={30}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary (Required) */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <TextArea
                        placeholder='هنا يتم إضافة وصف العقار بالكامل'
                        {...field}
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
                {loading ? (
                  <ThreeDot
                    color='black'
                    size='small'
                    text=''
                    textColor=''
                    style={{ height: '15px !important' }}
                  />
                ) : (
                  'Create'
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
