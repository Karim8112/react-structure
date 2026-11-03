import { DynamicStringList2 } from '@/components/DynamicStringList2'
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
import { IList, ListValues, Listchema } from '@/Model/Landing'
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
  data: IList | null
  loading: boolean
  setOpen: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const form = useForm<ListValues>({
    resolver: zodResolver(Listchema),
    defaultValues: {
      desc: data?.desc || [],
      title: data?.title || '',
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
          <CardContent className='flex gap-8 px-0'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUploadField
                      isRequired={true}
                      width={600}
                      height={400}
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
            <div className='flex w-full flex-col gap-6 pt-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' maxLength={60} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title (Required, max 20) */}
              <DynamicStringList2
                form={form}
                name='desc'
                label='List items'
                placeholder='type here'
              />
            </div>

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
