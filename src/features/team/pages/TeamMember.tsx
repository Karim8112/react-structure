import { useParams } from 'react-router'
import { useOneTeam } from '../hooks/useOneTeam'
// import { IPost } from './mainPost'
import { motion, type Variants } from 'framer-motion'

export default function PostDetail() {
  const { memberId } = useParams()
  const team_member = useOneTeam(memberId as string)
  console.log(
    `this is team member with title: ${team_member.data?.title}: \n`,
    team_member.data
  )

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  }

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  }

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return !team_member.loading ? (
    <div className='bg-white px-6 py-12 text-black selection:bg-[#d1b797] selection:text-black dark:bg-[#0d0d0d] dark:text-zinc-100 md:px-12'>
      {/* Main Content Area */}
      <motion.main
        className='gap-18 mx-auto mb-20 flex flex-col'
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
      >
        {/* Profile Hero Grid */}
        <div className='mb-20 flex w-full grid-cols-1 flex-col items-start gap-12 lg:flex-row'>
          {/* Left Column: Portrait Card */}
          <motion.div className='max-h-[400px] w-[30%]' variants={scaleIn}>
            <div className='group relative h-[400px] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900'>
              <img
                src={team_member.data?.imageLeft}
                alt={team_member.data?.title}
                className='w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105'
              />
              <div className='bg-linear-to-t absolute inset-0 from-black/80 via-black/20 to-transparent' />

              <div className='absolute bottom-2 left-4 right-4'>
                {team_member.data?.tags?.length != 0 && (
                  <span className='mb-4 inline-block rounded-full border border-[#d1b797]/40 bg-[#d1b797]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#d1b797] backdrop-blur-md'>
                    {team_member.data?.tags}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Biography & Details */}
          <motion.div
            className='flex grow flex-col justify-center'
            variants={fadeInUp}
          >
            <div className='mb-8'>
              <span className='block text-xs font-semibold uppercase tracking-widest text-[#d1b797]'>
                Team Member
              </span>
              <h1 className='mb-2 text-3xl font-semibold tracking-wide text-[#18181B] dark:text-white md:text-5xl'>
                {team_member.data?.title}
              </h1>
              <p className='mb-4 text-xl font-normal leading-relaxed text-zinc-600 dark:text-zinc-400'>
                {team_member.data?.summary != '' || undefined
                  ? team_member.data?.summary
                  : 'No Summary.'}
              </p>
            </div>

            <div className='mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-zinc-900/5 p-6 px-4 py-4 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:grid-cols-2'>
              <div>
                <span className='mb-1 block text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-500'>
                  Role & Focus
                </span>
                <span className='text-sm font-medium text-zinc-900 dark:text-zinc-200'>
                  {team_member.data?.tags?.length != 0 || undefined
                    ? team_member.data?.tags?.map((tag, index) => (
                        <span>
                          {index == 0 ? '' : ', '}
                          {tag}
                        </span>
                      ))
                    : `-`}
                </span>
              </div>
              <div>
                <span className='mb-1 block text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-500'>
                  Direct Email
                </span>
                <a
                  href={`mailto:${team_member.data?.email}`}
                  className='text-sm font-medium text-[#887054] hover:underline dark:text-[#d1b797]'
                >
                  {team_member.data?.email != undefined || ''
                    ? team_member.data?.email
                    : `-`}
                </a>
              </div>
            </div>

            <div className='mb-8 grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-zinc-900/5 p-6 px-4 py-4 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:grid-cols-2'>
              <div>
                <span className='mb-1 block text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-500'>
                  Education
                </span>
                <span className='text-sm font-medium text-zinc-900 dark:text-zinc-200'>
                  {team_member.data?.education?.length != 0 || undefined
                    ? team_member.data?.education?.map((ed, index) => (
                        <span>
                          {index == 0 ? '' : ', '}
                          {ed}
                        </span>
                      ))
                    : `-`}
                </span>
              </div>
              <div>
                <span className='mb-1 block text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-500'>
                  Languages
                </span>
                {team_member.data?.languages?.length != 0 || undefined
                  ? team_member.data?.languages?.map((lan, index) => {
                      return (
                        <span className='text-sm font-medium text-zinc-900 dark:text-zinc-200'>
                          {index == 0 ? '' : ', '}
                          {lan}
                        </span>
                      )
                    })
                  : `-`}
              </div>
            </div>
            {/* Actions */}
          </motion.div>
        </div>

        {/* Section 2: Key Skills & Expertise */}
        <motion.section className='mb-12 h-fit' variants={fadeInLeft}>
          <div className='mb-4 flex items-center gap-4'>
            <h3 className='text-xl uppercase tracking-wider text-[#18181B] dark:font-semibold dark:text-white'>
              Technical Skills
            </h3>
            <div className='h-px flex-1 bg-zinc-600 dark:bg-zinc-800' />
          </div>

          <div className='flex flex-wrap gap-3'>
            {team_member.data?.skills?.length != 0 ? (
              team_member.data?.skills?.map((skill, idx) => (
                <motion.span
                  key={idx}
                  variants={fadeInUp}
                  className='rounded-lg border border-gray-500 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 transition-colors hover:border-[#d1b797] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[#d1b797]/50'
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              <span className='font-light text-gray-50'>No Skills</span>
            )}
          </div>
        </motion.section>

        {/* Section 3: Experience & Contributions */}
        <motion.section className='pb-18 h-fit' variants={fadeInUp}>
          <div className='mb-4 flex items-center gap-4'>
            <h3 className='text-xl uppercase tracking-wider text-[#18181B] dark:font-semibold dark:text-white'>
              Experience & Background
            </h3>
            <div className='h-px flex-1 bg-zinc-600 dark:bg-zinc-800' />
          </div>

          <div className='flex flex-col gap-6'>
            {team_member.data?.experience?.length != 0 ? (
              team_member.data?.experience &&
              team_member.data?.experience.map((item, index) => (
                <div
                  key={index}
                  className='rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700'
                >
                  <div className='mb-2 flex flex-wrap items-center justify-between gap-2'>
                    <h4 className='text-lg font-bold text-white'>
                      {item.role}
                    </h4>
                    <span className='rounded-full border border-[#d1b797]/20 bg-[#d1b797]/10 px-4 py-1 font-mono text-xs text-[#d1b797]'>
                      {item.period}
                    </span>
                  </div>
                  <div className='mb-3 text-sm font-medium text-zinc-400'>
                    {item.company}
                  </div>
                  <p className='text-sm leading-relaxed text-zinc-400'>
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <span className='font-light text-gray-50'>No Experience</span>
            )}
          </div>
        </motion.section>
      </motion.main>
    </div>
  ) : (
    <div className='flex h-full w-full items-center justify-center'>
      ...Loading
    </div>
  )
}
