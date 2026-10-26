import MainDialog from '@/components/MainDialog'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ProjectType } from '@/Model/IProject'
import { Edit, Trash } from 'lucide-react'
import React from 'react'
import { useUpdateType } from '../hooks/useUpdateType'
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
    <Card className='flex items-center justify-between rounded-lg border border-black/10 bg-white px-5 py-3 shadow-xl dark:border-white/10 dark:bg-gray-950'>
      <span>{projectType.name}</span>
      {/* actions div */}
      <div className='flex items-center justify-center gap-2'>
        {/* delete dialog */}
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
            setOpen: open => setDeleteDialogOpen(open ? projectType._id : null),

            content: `Are you sure you want to delete this project type`,
            title: `Delete '${projectType.name}'`,
            Buttons: [
              // { btnText: "yes, i' m sure", type: 'ok' },
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
        {/* edit */}
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
              // { btnText: "yes, i' m sure", type: 'ok' },
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
  )
}

export default TypeCard
