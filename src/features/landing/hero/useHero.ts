import GetAxios from '@/lib/GetAxios'
import PatchAxios from '@/lib/PatchAxios'
import { IHero } from '@/Model/Landing'
import { APIs } from '@/routes_Apis'
import { useState } from 'react'
import IApi from '../../../Model/IApi'
export function useHero() {
  const [data, setData] = useState<IApi<IHero> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [patchLoading, setPatchLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  const GetData = function () {
    GetAxios<IApi<IHero>>({
      path: APIs.hero,
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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    payload: Record<string, unknown>
  }) {
    PatchAxios<Record<string, unknown>, unknown>({
      path: APIs.hero,
      isFormData: true,
      payload,
      objectId: id,
      onSuccess: () => {
        GetData()
        setOpen(false)
      },
      setLoading: setPatchLoading,
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
    patchLoading,
    snackbarmsg,
    snackbarOpen,
    snackbarColor
  }
}
