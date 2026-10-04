import GetAxios from '@/lib/GetAxios'
import { IProject } from '@/Model/IProject'
import { useEffect, useState } from 'react'
import IApi from '../../../Model/IApi'
import { APIs } from '../../../routes_Apis'
export function useProject() {
  const [data, setData] = useState<IApi<IProject> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  useEffect(() => {
    GetAxios<IApi<IProject>>({
      path: APIs.project,
      setLoading,
      onSuccess: projects => setData(projects),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  return { data, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
