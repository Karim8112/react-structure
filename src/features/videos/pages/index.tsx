import * as React from 'react'

import { useFormContext } from '@/context/form/formContext'
import Snackbar from '@mui/joy/Snackbar'
import { useNavigate } from 'react-router'
// import  IVideo  from '../../../Model/IVideo'
import MainDialog from '@/components/MainDialog'
import { convertToEmbedUrl, getYouTubeThumbnailUrl } from '@/lib/youtube'
import IVideo from '@/Model/IVideo'
import { routes } from '@/routes_Apis'
import { AnimatePresence, motion } from 'framer-motion'
import { Delete, Edit, Play, X } from 'lucide-react'
import { useState } from 'react'
import { useDelete } from '../hooks/useDelete'
import { useVideos } from '../hooks/useVideos'

export default function Video() {
  const [activeVideo, setActiveVideo] = useState<IVideo | null>(null)
  const { setVideo } = useFormContext()
  const navigate = useNavigate()
  const Videos = useVideos()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<string | null>(
    null
  )
  //
  const [hiddenRow, setHiddenRows] = React.useState<string[]>([])
  const filteredData = React.useMemo(() => {
    const rawData = Videos.data?.data || []
    return rawData.filter(
      (item: IVideo) => !hiddenRow.includes(item._id as string)
    )
  }, [Videos.data?.data, hiddenRow])
  //

  const DeleteHook = useDelete({ setOpen: setDeleteDialogOpen, setHiddenRows })

  //

  return (
    <>
      {' '}
      <div className='w-full'>
        {Videos.loading ? (
          <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className='h-48 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'
              />
            ))}
          </div>
        ) : (
          <div className='grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-4'>
            {filteredData?.map(video => {
              const isOpen = deleteDialogOpen === video._id
              return (
                <motion.div
                  key={`${video.title}-${video._id}`}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className='group space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-3'
                >
                  <div
                    onClick={() => setActiveVideo(video)}
                    className='relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-950'
                  >
                    <img
                      src={getYouTubeThumbnailUrl(video.path) || ''}
                      alt={video.title}
                      className='h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#D1B797] text-zinc-950 shadow-lg'>
                        <Play className='ml-0.5 h-5 w-5 fill-current' />
                      </div>
                    </div>
                  </div>
                  <h3 className='text-sm font-semibold text-zinc-100 group-hover:text-[#D1B797]'>
                    {video.title}
                  </h3>
                  <div className='flex w-fit gap-2'>
                    <button
                      key={`${video._id}-btn`}
                      type='button'
                      onClick={() => {
                        setVideo(video)
                        navigate(`${routes.update_video}`)
                        return
                      }}
                      className={`flex items-center gap-2 rounded-md bg-blue-200/70 px-4 py-1 font-medium text-blue-800`}
                    >
                      <Edit key={`${video._id}-edit`} size={15} />
                    </button>

                    <MainDialog
                      btnOptions={{
                        text: `delete`,
                        className: `flex items-center gap-2 rounded-md bg-red-200/70 px-4 py-1 font-medium text-red-800`,
                        Icon: <Delete key={`-delete`} size={15} />,
                        key: `${video._id}`
                      }}
                      dialogOptions={{
                        key: `${video._id}`,
                        open: isOpen,
                        setOpen: open =>
                          setDeleteDialogOpen(
                            open ? (video._id as string) : null
                          ),
                        content: `Are you sure you want to delete this project`,

                        title: `Delete Video`,
                        Buttons: [
                          // { btnText: "yes, i' m sure", type: 'ok' },
                          {
                            btnText: 'Delete this video',
                            type: 'error',
                            onClick() {
                              DeleteHook.Delete(video._id as string)
                            },
                            loading: DeleteHook.loading
                          }
                        ]
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}

            {/* active video dialog */}
            <AnimatePresence>
              {activeVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveVideo(null)}
                  className='fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md'
                >
                  <div className='relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#D1B797]/30 bg-zinc-900 shadow-2xl'>
                    <div className='flex items-center justify-between border-b border-zinc-800 bg-zinc-950 p-4'>
                      <h2 className='text-sm font-semibold text-zinc-100'>
                        {activeVideo.title}
                      </h2>
                      <button
                        onClick={() => setActiveVideo(null)}
                        className='rounded bg-zinc-800 p-1.5 text-zinc-400 hover:text-white'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                    <div className='relative aspect-video w-full bg-black'>
                      <iframe
                        src={convertToEmbedUrl(activeVideo.path)}
                        title={'Alice Merton - No Roots'}
                        allow={
                          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        }
                        allowFullScreen
                        referrerPolicy='origin-when-cross-origin'
                        // src={activeVideo.path}
                        // title={activeVideo.title}
                        className='h-full w-full border-0'
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      {Videos.snackbarColor == 'danger' && (
        <Snackbar
          variant='outlined'
          color={Videos.snackbarColor}
          autoHideDuration={4000}
          open={Videos.snackbarOpen}
        >
          {Videos.snackbarmsg}
        </Snackbar>
      )}
    </>
  )
}
