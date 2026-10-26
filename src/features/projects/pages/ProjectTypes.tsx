import { type ProjectType } from '@/Model/IProject'
import Snackbar from '@mui/joy/Snackbar'

import React from 'react'
import { useDeleteType } from '../hooks/useDeleteType'
import { useProjectTypes } from '../hooks/useProjectType'
import TypeCard from './TypeCard'

const ProjectTypes = function () {
  const ProjectTypes = useProjectTypes()
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
    <>
      <h1 className='mb-4'>Project Types</h1>
      {ProjectTypes.loading ? (
        '...Loading'
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
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
    </>
  )
}

export default ProjectTypes
