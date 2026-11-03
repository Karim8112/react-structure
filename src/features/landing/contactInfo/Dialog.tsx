import { DynamicStringList2 } from '@/components/DynamicStringList2'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
  ContactInfoSchema,
  ContactInfoValues,
  IContactInfo
} from '@/Model/Landing'
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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => void
  data: IContactInfo | null
  loading: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const form = useForm<ContactInfoValues>({
    resolver: zodResolver(ContactInfoSchema),
    defaultValues: {
      address: data?.address || [],
      emails: data?.emails || [],
      numbers: data?.numbers || []
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
          <CardContent className='flex flex-col gap-8 px-0'>
            {/* Dynamic String Lists */}
            <DynamicStringList2
              form={form}
              name='address'
              label='Address'
              placeholder='Syria, Aleppo, Al-Fourqan, +963 9421 423 11'
            />
            <DynamicStringList2
              form={form}
              name='emails'
              label='Emails'
              placeholder='manager@aaran-co.com'
            />
            <DynamicStringList2
              form={form}
              name='numbers'
              label='Numbers'
              placeholder='+963 9421 423 11'
            />
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
