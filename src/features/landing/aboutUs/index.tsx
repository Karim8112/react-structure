import ActionHeader from '@/components/ActionHeader'
import ImagesContainer from '@/components/ImagesContainer'
import { routes } from '@/routes_Apis'
import { useEffect } from 'react'
import { useAboutUs } from './useAboutUs'

const AboutUs = function () {
  const aboutUs = useAboutUs()
  useEffect(() => {
    aboutUs.GetData()
  }, [])

  const Paragraph = function ({
    index,
    title,
    description
  }: {
    index: number
    title: string
    description: string
  }) {
    return (
      <div className='flex flex-col gap-5 text-start'>
        {/* الترويسة العلوية الفاخرة لكل عمود */}
        <div className='flex items-center gap-4 border-b border-white pb-3'>
          <span className='font-mono text-[18px] tracking-widest text-[#d1b797]'>
            0{index}
          </span>
          <span className='text-white/9003 font-sans text-[16px] font-semibold uppercase tracking-[0.25em]'>
            {title}
          </span>
        </div>

        {/*  */}
        <p
          style={{ fontFamily: 'sans-serif' }}
          className='text-[19px] font-medium leading-loose tracking-wide text-white sm:text-[16px] md:text-[18px] lg:text-[19px]'
        >
          {description}
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 p-2'>
      <ActionHeader
        dir='end'
        buttons={[
          {
            type: 'edit',
            text: 'edit',
            behave: {
              path: routes.edit_about_us
            }
          }
        ]}
      />
      <div className='grid grid-cols-1 gap-12 p-6 lg:grid-cols-3'>
        {aboutUs.loading ? (
          <>
            <div className='h-[50vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
            <div className='h-[50vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
            <div className='h-[50vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
          </>
        ) : (
          aboutUs.data?.data && (
            <>
              <Paragraph
                index={1}
                title={aboutUs.data.data[0].title1}
                description={aboutUs.data.data[0].description}
              />

              <Paragraph
                index={2}
                title={aboutUs.data.data[0].title2}
                description={aboutUs.data.data[0].description2}
              />

              <Paragraph
                index={3}
                title={aboutUs.data.data[0].title3}
                description={aboutUs.data.data[0].description3}
              />
            </>
          )
        )}
      </div>

      {aboutUs.loading ? (
        <div className='h-[10vh] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'></div>
      ) : (
        aboutUs.data?.data?.[0].images &&
        aboutUs.data?.data?.[0].images.length > 0 && (
          <ImagesContainer
            images={aboutUs.data.data[0].images}
            title='About us Images'
            cols={6}
          />
        )
      )}
    </div>
  )
}

export default AboutUs
