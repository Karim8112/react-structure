import MainDialog from '@/components/MainDialog'
import { Edit, Plus, Trash } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import Dialog from './Dialog'
import PostDialog from './postDialog'
import { useAdditionalSection } from './useAdditionalSection'

export default function AdditioalSection() {
  const AdditioalSection = useAdditionalSection()

  React.useEffect(() => {
    AdditioalSection.GetData()
  }, [])

  const [EditDialogOpen, setEditDialogOpen] = React.useState<string | null>(
    null
  )
  const [DeleteDialogOpen, setDeleteDialogOpen] = React.useState<string | null>(
    null
  )

  const [postOpen, setPostOpen] = useState<boolean>(false)

  return (
    <div className='grid w-full grid-cols-1 flex-col gap-9 px-4 pb-8'>
      {AdditioalSection.loading ? (
        <>
          <div className='h-[50vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
          <div className='h-[50vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
        </>
      ) : (
        <>
          <div className='flex w-full items-center justify-start'>
            <MainDialog
              btnOptions={{
                text: `Add new `,
                className: `flex items-center  rounded-md bg-green-200/70 px-2 py-1 font-medium text-green-800`,
                Icon: <Plus key={`edit`} size={20} />
              }}
              dialogOptions={{
                max_width: '3xl',
                open: Boolean(postOpen),
                setOpen: setPostOpen,
                Element: (
                  <PostDialog
                    loading={AdditioalSection.actionLoading}
                    setOpen={setPostOpen}
                    onSubmit={AdditioalSection.POST}
                  />
                ),
                title: `Add new item`
              }}
            />
          </div>
          {AdditioalSection.data?.data.map(item => (
            <div className='flex h-[70vh] gap-10 rounded-lg border p-4'>
              <div
                className='relative flex h-full w-[40%] items-start justify-center rounded-xl'
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>

              {/* the title-text */}
              <div className='flex w-full flex-col gap-9 pt-4'>
                <div className='flex w-full items-center justify-between'>
                  <h3 className='text-4xl font-bold text-[#D1B797]'>
                    {item.title}
                  </h3>
                  <div className='flex shrink-0 items-center justify-center gap-2'>
                    {/* Delete Dialog */}
                    <MainDialog
                      btnOptions={{
                        text: ``,
                        className: `flex items-center!  rounded-md bg-red-200 px-1 py-1 font-medium text-red-800`,
                        Icon: <Trash key={`delete`} size={20} />,
                        key: `${item._id}`
                      }}
                      dialogOptions={{
                        key: `${item._id}`,
                        open: DeleteDialogOpen === item._id,
                        setOpen: open =>
                          setDeleteDialogOpen(
                            open ? (item._id as string) : null
                          ),

                        content: `Are you sure you want to delete this item?`,
                        title: `Delete '${item.text}'`,
                        Buttons: [
                          {
                            btnText: `Delete`,
                            type: 'error',
                            onClick() {
                              AdditioalSection.Delete({
                                id: item._id as string,
                                setOpen: setDeleteDialogOpen
                              })
                            },
                            loading: AdditioalSection.actionLoading
                          }
                        ]
                      }}
                    />

                    {/* Edit Dialog */}
                    <MainDialog
                      btnOptions={{
                        text: ``,
                        className: `flex items-center  rounded-md bg-blue-200 px-2 py-1 font-medium text-blue-800`,
                        Icon: <Edit key={`edit`} size={20} />,
                        key: `${item._id}`
                      }}
                      dialogOptions={{
                        max_width: '3xl',
                        key: `${item._id}`,
                        open: EditDialogOpen === item._id,
                        setOpen: open =>
                          setEditDialogOpen(open ? (item._id as string) : null),
                        Element: (
                          <Dialog
                            data={item}
                            loading={AdditioalSection.actionLoading}
                            setOpen={setEditDialogOpen}
                            onSubmit={AdditioalSection.PatchData}
                          />
                        ),
                        title: `Edit '${item.title}'`
                      }}
                    />
                  </div>
                </div>

                <p className='text-xl leading-relaxed'>{item.text}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
