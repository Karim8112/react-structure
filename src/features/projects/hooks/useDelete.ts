import DeleteAxios from '@/lib/DeleteAxios'
import IApi from '@/Model/IApi'
import { IProject } from '@/Model/IProject'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { APIs, routes } from '../../../routes_Apis'
export function useDelete({
  setOpen
}: {
  setOpen: React.Dispatch<React.SetStateAction<null | string>>
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const navigate = useNavigate()

  const Delete = (memberId: string) => {
    DeleteAxios<IApi<IProject>>({
      ObjectId: memberId,
      path: APIs.project,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess() {
        setTimeout(() => {
          navigate(routes.projects)
        }, 1000)
        setOpen(null)
      }
    })
  }

  return { Delete, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
