import GetAxios from '@/lib/GetAxios'
import IVideo from '@/Model/IVideo'
import { APIs } from '@/routes_Apis'
import { useEffect, useState } from 'react'
import IApi from '../../../Model/IApi'
export function useVideos() {
  const [data, setData] = useState<IApi<IVideo> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  useEffect(() => {
    GetAxios<IApi<IVideo>>({
      path: APIs.video,
      setLoading,
      onSuccess: videos => setData(videos),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  return { data, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
