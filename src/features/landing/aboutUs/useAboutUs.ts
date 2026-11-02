import GetAxios from '@/lib/GetAxios'
import PatchAxios from '@/lib/PatchAxios'
import { IAboutUs } from '@/Model/Landing'
import { APIs } from '@/routes_Apis'
import { useState } from 'react'
import IApi from '../../../Model/IApi'
export function useAboutUs() {
  const [data, setData] = useState<IApi<IAboutUs> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  const GetData = function () {
    GetAxios<IApi<IAboutUs>>({
      path: APIs.about_us,
      setLoading,
      onSuccess: data => setData(data),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  const PatchData = function ({
    id,
    payload,
    setOpen
  }: {
    id: string
    setOpen: React.Dispatch<React.SetStateAction<string | null>>
    payload: Record<string, unknown>
  }) {
    PatchAxios<Record<string, unknown>, unknown>({
      path: APIs.about_us,
      isFormData: true,
      payload,
      objectId: id,
      onSuccess: () => {
        GetData()
        setOpen(null)
      },
      setLoading: setActionLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  return {
    GetData,
    PatchData,
    data,
    loading,
    actionLoading,
    snackbarmsg,
    snackbarOpen,
    snackbarColor
  }
}
