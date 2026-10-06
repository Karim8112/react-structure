import DeleteAxios from '@/lib/DeleteAxios'
import IApi from '@/Model/IApi'
import ITeam from '@/Model/ITeam'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { APIs, routes } from '../../../routes_Apis'
export function useDelete({
  memberId,
  setOpen
}: {
  memberId: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const navigate = useNavigate()

  const Delete = () => {
    DeleteAxios<IApi<ITeam>>({
      ObjectId: memberId,
      path: APIs.team,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess() {
        setTimeout(() => {
          navigate(routes.main)
        }, 1000)
        setOpen(false)
      }
    })
  }

  return { Delete, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
