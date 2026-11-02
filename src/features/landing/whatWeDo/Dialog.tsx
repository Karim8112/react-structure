import ImageUploadField from '@/components/imageUpload'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IWhatWeDo, WhatWeDoSchema, WhatWeDoValues } from '@/Model/Landing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ThreeDot } from 'react-loading-indicators'

const dBtnClass = ``

const Dialog = function ({
  data,
  loading,
  onSubmit,
  setOpen
}: {
  onSubmit: ({
    id,
    payload,
    setOpen
  }: {
    id: string
    payload: Record<string, unknown>
    setOpen: React.Dispatch<React.SetStateAction<string | null>>
  }) => void
  data: IWhatWeDo | null
  loading: boolean
  setOpen: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const form = useForm<WhatWeDoValues>({
    resolver: zodResolver(WhatWeDoSchema),
    defaultValues: {
      text: data?.text || '',
      image: data?.image || ''
    }
  })
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            onSubmit({
              id: data?._id || '',
              payload: form.getValues(),
              setOpen
            })
          })}
          className=''
        >
          <CardContent className='px-0'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUploadField
                      isRequired={true}
                      width={400}
                      name=''
                      label='Main Image'
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
              name='text'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Text *</FormLabel>
                  <FormControl>
                    <Input placeholder='Text' maxLength={60} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamic String Lists */}
          </CardContent>

          <DialogFooter className='bg- sm:justify-end'>
            <Button disabled={loading} type='submit' className={dBtnClass}>
              {loading ? (
                <ThreeDot
                  color='#000'
                  size='small'
                  text=''
                  textColor=''
                  style={{ height: '15px !important' }}
                />
              ) : (
                <span>Save</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
export default Dialog
