import { type ProjectType } from '@/Model/IProject'
import Snackbar from '@mui/joy/Snackbar'

import MainDialog from '@/components/MainDialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useDeleteType } from '../hooks/useDeleteType'
import { useProjectTypes } from '../hooks/useProjectType'
import TypeCard from './TypeCard'

const ProjectTypes = function () {
  const [addedType, setAddedType] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const ProjectTypes = useProjectTypes({ setOpen })
  //
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<string | null>(
    null
  )
  const [editDialogOpen, setEditDialogOpen] = React.useState<string | null>(
    null
  )
  const [hiddenRow, setHiddenRows] = React.useState<string[]>([])

  const DeleteHook = useDeleteType({
    setHiddenRows: setHiddenRows,
    setOpen: setDeleteDialogOpen
  })

  const filteredData = React.useMemo(() => {
    const rawData = ProjectTypes.data?.data || []
    return rawData.filter((item: ProjectType) => !hiddenRow.includes(item._id))
  }, [ProjectTypes.data?.data, hiddenRow])
  //
  return (
    <div>
      <h1 className='mb-4'>Project Types</h1>

      <MainDialog
        btnOptions={{
          text: `Add new Type`,
          className: `flex items-center mb-5  rounded-md bg-green-200/70 px-2 py-1 font-medium text-green-800`,
          Icon: <Plus key={`edit`} size={20} />
        }}
        dialogOptions={{
          open: open,
          setOpen: setOpen,
          content: `what the name you want to call it now?`,
          Element: (
            <Input
              content='test'
              type='text'
              value={addedType}
              onChange={e => {
                setAddedType(e.target.value)
              }}
            />
          ),
          title: `Add new project type`,
          Buttons: [
            // { btnText: "yes, i' m sure", type: 'ok' },
            {
              btnText: `Save`,
              type: 'ok',
              onClick() {
                ProjectTypes.Post(addedType)
              },
              loading: ProjectTypes.loading
            }
          ]
        }}
      />

      {ProjectTypes.loading ? (
        <div className=''>Loading...</div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
          {filteredData.map(type => {
            const deleteOpen = deleteDialogOpen == type._id
            const editOpen = editDialogOpen == type._id
            return (
              <TypeCard
                key={type._id}
                DeleteAxios={DeleteHook.Delete}
                loading={DeleteHook.loading}
                projectType={type}
                deleteIsOpen={deleteOpen}
                editIsOpen={editOpen}
                setEditDialogOpen={setEditDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                Refresh={ProjectTypes.Refresh}
              />
            )
          })}
        </div>
      )}
      <Snackbar
        variant='outlined'
        color={DeleteHook.snackbarColor}
        autoHideDuration={4000}
        open={DeleteHook.snackbarOpen}
      >
        {DeleteHook.snackbarmsg}
      </Snackbar>
    </div>
  )
}

export default ProjectTypes
