import DeleteAxios from '@/lib/DeleteAxios'
import IApi from '@/Model/IApi'
import IVideo from '@/Model/IVideo'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { APIs, routes } from '../../../routes_Apis'
export function useDelete({
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

  const navigate = useNavigate()

  const Delete = (memberId: string) => {
    DeleteAxios<IApi<IVideo>>({
      ObjectId: memberId,
      path: APIs.video,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess() {
        setTimeout(() => {
          navigate(routes.videos)
        }, 1000)
        setHiddenRows(hiddenRows => {
          return [...hiddenRows, memberId]
        })
        setOpen(null)
      }
    })
  }

  return { Delete, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
