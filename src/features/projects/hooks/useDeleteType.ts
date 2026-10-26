import DeleteAxios from '@/lib/DeleteAxios'
import IApi from '@/Model/IApi'
import { ProjectType } from '@/Model/IProject'
import { useState } from 'react'
import { APIs } from '../../../routes_Apis'
export function useDeleteType({
  setOpen,
  setHiddenRows
}: {
  setOpen: React.Dispatch<React.SetStateAction<null | string>>
  setHiddenRows: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const Delete = (id: string) => {
    DeleteAxios<IApi<ProjectType>>({
      ObjectId: id,
      path: APIs.project_type,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess() {
        setTimeout(() => {
          setSnackbarOpen(false)
        }, 3000)
        setHiddenRows(hiddenRows => {
          return [...hiddenRows, id]
        })
        setOpen(null)
      },
      onError() {
        setTimeout(() => {
          setSnackbarOpen(false)
        }, 3000)
        setOpen(null)
      }
    })
  }

  return { Delete, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
