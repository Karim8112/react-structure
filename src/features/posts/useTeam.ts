import GetAxios from '@/lib/GetAxios'
import ITeam from '@/Model/ITeam'
import { useEffect, useState } from 'react'
export function useTeam() {
  const [data, setData] = useState<ITeam[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  useEffect(() => {
    GetAxios<ITeam[]>({
      path: '/team',
      setLoading,
      onSuccess: teams => setData(teams),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  useEffect(() => {
    console.log(`this is the team members`, data)
  }, [data])

  return { data, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
