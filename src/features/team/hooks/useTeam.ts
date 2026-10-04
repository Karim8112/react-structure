import GetAxios from '@/lib/GetAxios'
import ITeam from '@/Model/ITeam'
import { APIs } from '@/routes_Apis'
import { useEffect, useState } from 'react'
import IApi from '../../../Model/IApi'
export function useTeam() {
  const [data, setData] = useState<IApi<ITeam> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  useEffect(() => {
    GetAxios<IApi<ITeam>>({
      path: APIs.team,
      setLoading,
      onSuccess: teams => setData(teams),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  return { data, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
