import GetAxios from '@/lib/GetAxios'
import PostAxios from '@/lib/PostAxios'
import { ProjectType } from '@/Model/IProject'
import { APIs } from '@/routes_Apis'
import { useEffect, useState } from 'react'
import IApi from '../../../Model/IApi'
export function useProjectTypes({
  setOpen
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
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
      onSuccess: projects => setData(projects),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  const Refresh = function () {
    GetAxios<IApi<ProjectType>>({
      path: APIs.project_type,
      setLoading,
      onSuccess: projects => setData(projects),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  const Post = (text: string) => {
    PostAxios<Record<string, unknown>, unknown>({
      payload: { name: text },
      path: APIs.project_type,
      setLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess() {
        setTimeout(() => {
          setSnackbarOpen(false)
        }, 3000)
        Refresh()
        // setHiddenRows(hiddenRows => {
        //   return [...hiddenRows, id]
        // })
        setOpen(false)
      },
      onError() {
        setTimeout(() => {
          setSnackbarOpen(false)
        }, 3000)
        setOpen(false)
      }
    })
  }

  return {
    data,
    loading,
    snackbarmsg,
    snackbarOpen,
    snackbarColor,
    Refresh,
    Post
  }
}
