import GetAxios from '@/lib/GetAxios'
import { ProjectType } from '@/Model/IProject'
import { APIs } from '@/routes_Apis'
import { useEffect, useState } from 'react'
import IApi from '../../../Model/IApi'
export function useProjectTypes() {
  const [data, setData] = useState<IApi<ProjectType> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  useEffect(() => {
    GetAxios<IApi<ProjectType>>({
      path: APIs.project_type,
      setLoading,
      onSuccess: teams => setData(teams),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  const Refresh = function () {
    GetAxios<IApi<ProjectType>>({
      path: APIs.project_type,
      setLoading,
      onSuccess: teams => setData(teams),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  return { data, loading, snackbarmsg, snackbarOpen, snackbarColor, Refresh }
}
