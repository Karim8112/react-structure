import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  Folder,
  Image as ImageIcon,
  Layers,
  Maximize2,
  Sparkles,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'

// Shadcn UI Imports
import ActionHeader from '@/components/ActionHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { routes } from '@/routes_Apis'
import { useParams } from 'react-router'
import { useProject } from '../hooks/useProject'

// --- TypeScript Interfaces ---

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function ShowProject() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'before' | 'after'>('all')
  const projectHook = useProject()
  const { projectId } = useParams()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (projectId) projectHook.getOne({ id: projectId })
  }, [])

  const hasBeforeAfter =
    (projectHook.oneProject?.imagesBefore &&
      projectHook.oneProject?.imagesBefore.length > 0) ||
    (projectHook.oneProject?.imagesAfter &&
      projectHook.oneProject?.imagesAfter.length > 0)

  return !projectHook.loading ? (
    <motion.div
      className='mx-auto min-h-screen max-w-7xl space-y-8 bg-background px-4 text-foreground sm:px-6 lg:px-10'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <ActionHeader
        dir='end'
        buttons={[
          {
            text: `Edit`,
            type: 'edit',
            behave: {
              path: routes.update_project.concat(`/${projectId}`)
            }
          },

          {
            text: `Delete`,
            type: 'delete',
            behave: {
              open: dialogOpen,
              setOpen: setDialogOpen,
              title: `Deleting '${projectHook.oneProject?.name}'`,
              content: `do you want to delete ${projectHook.oneProject?.name}`,

              Buttons: [
                // { btnText: "yes, i' m sure", type: 'ok' },
                {
                  btnText: 'Delete this project',
                  type: 'error',
                  onClick() {
                    projectHook.Delete({
                      memberId: projectHook.oneProject?._id as string,
                      setOpen: setDialogOpen
                    })
                  },
                  loading: projectHook.deletLoading
                }
              ]
            }
          }
        ]}
      />
      {/* --- Top Navigation Header --- */}
      <motion.div
        variants={itemVariants}
        className='flex items-center justify-between'
      >
        <Badge
          variant='secondary'
          className='gap-1 px-3 py-1 text-xs font-semibold'
        >
          <Folder className='h-3.5 w-3.5' />
          {projectHook.oneProject?.projectType.name}
        </Badge>
      </motion.div>

      {/* --- Hero Section: Title & Main Image --- */}
      <motion.div variants={itemVariants} className='space-y-4'>
        <div className='space-y-2'>
          <h1 className='tr text-xl! mb-8 font-bold sm:text-4xl lg:text-5xl'>
            {projectHook.oneProject?.name}
          </h1>

          {projectHook.oneProject?.organization && (
            <div className='mt-4 flex items-center gap-2 pb-6 font-medium text-muted-foreground sm:text-base'>
              <Building2 className='h-4 w-4 text-primary' />
              <span className='text-xl font-normal'>
                Organization:
                <span className='text-2xl font-normal text-black dark:text-white'>
                  {' '.concat(projectHook.oneProject?.organization)}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Hero Main Image Banner */}
        <div className='group relative aspect-video max-h-[500px] w-full overflow-hidden rounded-2xl border bg-muted shadow-lg'>
          <img
            src={projectHook.oneProject?.mainImage}
            alt={projectHook.oneProject?.name}
            className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

          <Button
            variant='secondary'
            size='icon'
            onClick={() =>
              setSelectedImage(projectHook.oneProject?.mainImage ?? null)
            }
            className='absolute bottom-4 right-4 bg-background/80 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100'
          >
            <Maximize2 className='h-4 w-4' />
          </Button>
        </div>
      </motion.div>

      {/* --- Quick Overview Banner --- */}
      <motion.div variants={itemVariants}>
        <Card className='border-primary/20 bg-primary/5 shadow-sm dark:bg-primary/10'>
          <CardHeader className='pb-2'>
            <CardTitle className='flex items-center gap-2 text-lg font-semibold text-primary'>
              <Sparkles className='h-5 w-5' />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-base font-medium leading-relaxed sm:text-lg'>
              {projectHook.oneProject?.quickOverview}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* --- Summary Section (If available) --- */}
      {projectHook.oneProject?.summary && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-xl font-bold'>
                <Layers className='h-5 w-5 text-primary' />
                Project Description & Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'>
                {projectHook.oneProject?.summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* --- Before & After Visual Gallery Section (If available) --- */}
      {hasBeforeAfter && (
        <motion.div variants={itemVariants} className='space-y-6 border-t pt-4'>
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h2 className='flex items-center gap-2 text-2xl font-bold'>
                <ImageIcon className='h-6 w-6 text-primary' />
                Transformation Gallery
              </h2>
              <p className='text-sm text-muted-foreground'>
                Compare visual progression before and after completion.
              </p>
            </div>

            {/* Filter Tabs */}
            <Tabs
              defaultValue='all'
              value={activeTab}
              onValueChange={(v: unknown) => {
                if (v === 'all' || v === 'before' || v === 'after') {
                  setActiveTab(v)
                }
              }}
              className='w-full sm:w-auto'
            >
              <TabsList className='grid w-full grid-cols-3 sm:w-auto'>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='before'>Before</TabsTrigger>
                <TabsTrigger value='after'>After</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Gallery Grid */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Before Images Column */}
            {(activeTab === 'all' || activeTab === 'before') &&
              projectHook.oneProject?.imagesBefore &&
              projectHook.oneProject?.imagesBefore.length > 0 && (
                <Card className='border-red-500/30 bg-amber-500/5'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='flex items-center justify-between text-base font-bold text-red-600 dark:text-red-400'>
                      <span>Before:</span>
                      <Badge
                        variant='outline'
                        className='border-red-500/40 text-red-600'
                      >
                        {projectHook.oneProject?.imagesBefore.length} Image(s)
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    {projectHook.oneProject?.imagesBefore.map(
                      (imgUrl, index) => (
                        <motion.div
                          key={`before-${index}`}
                          whileHover={{ scale: 1.03 }}
                          className='group relative aspect-video cursor-pointer overflow-hidden rounded-lg border bg-background shadow-sm'
                          onClick={() => setSelectedImage(imgUrl)}
                        >
                          <img
                            src={imgUrl}
                            alt={`Before stage ${index + 1}`}
                            className='h-full w-full object-cover'
                          />
                          <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
                            <Maximize2 className='h-5 w-5 text-white' />
                          </div>
                        </motion.div>
                      )
                    )}
                  </CardContent>
                </Card>
              )}

            {/* After Images Column */}
            {(activeTab === 'all' || activeTab === 'after') &&
              projectHook.oneProject?.imagesAfter &&
              projectHook.oneProject?.imagesAfter.length > 0 && (
                <Card className='border-emerald-500/30 bg-emerald-500/5'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='flex items-center justify-between text-base font-bold text-emerald-600 dark:text-emerald-400'>
                      <span>After:</span>
                      <Badge
                        variant='outline'
                        className='border-emerald-500/40 text-emerald-600'
                      >
                        {projectHook.oneProject?.imagesAfter.length} Image(s)
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    {projectHook.oneProject?.imagesAfter.map(
                      (imgUrl, index) => (
                        <motion.div
                          key={`after-${index}`}
                          whileHover={{ scale: 1.03 }}
                          className='group relative aspect-video cursor-pointer overflow-hidden rounded-lg border bg-background shadow-sm'
                          onClick={() => setSelectedImage(imgUrl)}
                        >
                          <img
                            src={imgUrl}
                            alt={`After stage ${index + 1}`}
                            className='h-full w-full object-cover'
                          />
                          <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
                            <Maximize2 className='h-5 w-5 text-white' />
                          </div>
                        </motion.div>
                      )
                    )}
                  </CardContent>
                </Card>
              )}
          </div>
        </motion.div>
      )}

      {/* --- Image Lightbox Modal --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md'
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className='relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl border bg-background shadow-2xl'
            >
              <button
                onClick={() => setSelectedImage(null)}
                className='absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black'
              >
                <X className='h-5 w-5' />
              </button>

              <img
                src={selectedImage}
                alt='Enlarged project view'
                className='h-full max-h-[85vh] w-full object-contain'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ) : (
    <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='h-80 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'
        />
      ))}
    </div>
  )
}
