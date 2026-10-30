import { motion, type Variants } from 'framer-motion'
import { Edit, Folder, Trash } from 'lucide-react'
import React from 'react'

// UI Components & Models
import MainDialog from '@/components/MainDialog'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ProjectType } from '@/Model/IProject'
import { useUpdateType } from '../hooks/useUpdateType'

// --- Animation Variants ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

const TypeCard = function ({
  projectType,
  deleteIsOpen,
  editIsOpen,
  setDeleteDialogOpen,
  setEditDialogOpen,
  DeleteAxios,
  loading,
  Refresh
}: {
  projectType: ProjectType
  deleteIsOpen: boolean
  editIsOpen: boolean
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<null | string>>
  setEditDialogOpen: React.Dispatch<React.SetStateAction<null | string>>
  DeleteAxios: (id: string) => void
  loading: boolean
  Refresh?: () => void
}) {
  const UpdateHook = useUpdateType({
    setOpen: setEditDialogOpen,
    id: projectType._id,
    Refresh: Refresh
  })

  const [editingText, setEditingText] = React.useState<string>(projectType.name)

  return (
    <motion.div
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className='group relative h-full w-full'
    >
      <Card className='flex items-center justify-between gap-3 rounded-xl border border-gray-200/80 bg-white/90 px-5 py-3.5 shadow-md backdrop-blur-md transition-colors duration-300 hover:border-[#d1b797]/60 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-[#d1b797]/40 dark:hover:bg-zinc-900'>
        {/* Title & Icon Section */}
        <div className='flex items-center gap-3 overflow-hidden'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d1b797]/30 bg-[#d1b797]/10 text-[#887054] transition-colors group-hover:border-[#d1b797]/60 group-hover:bg-[#d1b797]/20 dark:text-[#d1b797]'>
            <Folder className='h-4 w-4' />
          </div>
          <span className='truncate text-sm font-semibold tracking-wide text-zinc-800 transition-colors dark:text-zinc-200'>
            {projectType.name}
          </span>
        </div>

        {/* Actions Div (Exact MainDialog logic & button styles preserved) */}
        <div className='flex shrink-0 items-center justify-center gap-2'>
          {/* Delete Dialog */}
          <MainDialog
            btnOptions={{
              text: ``,
              className: `flex items-center!  rounded-md bg-red-200/70 px-1 py-1 font-medium text-red-800`,
              Icon: <Trash key={`delete`} size={20} />,
              key: `${projectType._id}`
            }}
            dialogOptions={{
              key: `${projectType._id}`,
              open: deleteIsOpen,
              setOpen: open =>
                setDeleteDialogOpen(open ? projectType._id : null),

              content: `Are you sure you want to delete this project type`,
              title: `Delete '${projectType.name}'`,
              Buttons: [
                {
                  btnText: `Delete`,
                  type: 'error',
                  onClick() {
                    DeleteAxios(projectType._id)
                  },
                  loading: loading
                }
              ]
            }}
          />

          {/* Edit Dialog */}
          <MainDialog
            btnOptions={{
              text: ``,
              className: `flex items-center  rounded-md bg-blue-200/70 px-2 py-1 font-medium text-blue-800`,
              Icon: <Edit key={`edit`} size={20} />,
              key: `${projectType._id}`
            }}
            dialogOptions={{
              key: `${projectType._id}`,
              open: editIsOpen,
              setOpen: open => setEditDialogOpen(open ? projectType._id : null),
              content: `what the name you want to call it now?`,
              Element: (
                <Input
                  content='test'
                  type='text'
                  defaultValue={projectType.name}
                  value={editingText != '' ? editingText : projectType.name}
                  onChange={e => {
                    setEditingText(e.target.value)
                  }}
                />
              ),
              title: `Edit '${projectType.name}'`,
              Buttons: [
                {
                  btnText: `Save`,
                  type: 'ok',
                  onClick() {
                    UpdateHook.Update(editingText)
                  },
                  loading: UpdateHook.loading
                }
              ]
            }}
          />
        </div>
      </Card>
    </motion.div>
  )
}

export default TypeCard
