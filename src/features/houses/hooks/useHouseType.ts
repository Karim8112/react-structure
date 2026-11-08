import GetAxios from '@/lib/GetAxios'
import PostAxios from '@/lib/PostAxios'
import { HouseType } from '@/Model/IEstate'
import { APIs } from '@/routes_Apis'
import { useEffect, useState } from 'react'
import IApi from '../../../Model/IApi'
export function useHouseTypes({
  setOpen
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [data, setData] = useState<IApi<HouseType> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  useEffect(() => {
    GetAxios<IApi<HouseType>>({
      path: APIs.house_type,
      setLoading,
      onSuccess: housesTypes => setData(housesTypes),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }, [])

  const Refresh = function () {
    GetAxios<IApi<HouseType>>({
      path: APIs.house_type,
      setLoading,
      onSuccess: housesTypes => setData(housesTypes),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  const Post = (text: string) => {
    PostAxios<Record<string, unknown>, unknown>({
      payload: { name: text },
      path: APIs.house_type,
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
        if (setOpen) setOpen(false)
      },
      onError() {
        setTimeout(() => {
          setSnackbarOpen(false)
        }, 3000)
        if (setOpen) setOpen(false)
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
