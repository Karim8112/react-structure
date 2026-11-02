import ActionHeader from '@/components/ActionHeader'
import * as React from 'react'
import Dialog from './Dialog'
import { useHero } from './useHero'

export default function Hero() {
  const Hero = useHero()

  React.useEffect(() => {
    Hero.GetData()
  }, [])

  const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false)
  return (
    <div className='flex w-full flex-col gap-5 px-4'>
      {Hero.loading ? (
        <div className='h-[100vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
      ) : (
        <>
          <ActionHeader
            buttons={[
              {
                text: 'Edit',
                type: 'edit',
                behave: {
                  title: 'Edit main image',
                  open: editDialogOpen,
                  setOpen: setEditDialogOpen,
                  Element: (
                    <Dialog
                      data={Hero.data?.data[0]}
                      loading={Hero.patchLoading}
                      onSubmit={Hero.PatchData}
                      setOpen={setEditDialogOpen}
                    />
                  )
                }
              }
            ]}
            dir='end'
          />
          <div
            className='flex h-screen w-full items-center justify-center rounded-xl'
            style={{
              backgroundImage: `url(${Hero.data?.data[0]?.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className='flex max-w-[800px] flex-col items-center justify-center gap-5 text-center text-white'>
              <h3
                style={{ fontFamily: 'sans-serif' }}
                className='text-[clamp(1.8rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em]'
              >
                {Hero.data?.data[0]?.mainTitle}
              </h3>
              <div className='flex w-fit items-center justify-center rounded-full bg-white px-8 py-4 text-base font-normal text-black transition-all duration-300 hover:bg-gray-200'>
                Contact Us
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
