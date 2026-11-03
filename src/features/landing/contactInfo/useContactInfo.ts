import GetAxios from '@/lib/GetAxios'
import PatchAxios from '@/lib/PatchAxios'
import { IContactInfo } from '@/Model/Landing'
import { APIs } from '@/routes_Apis'
import { useState } from 'react'
import IApi from '../../../Model/IApi'
export function useContactInfo() {
  const [data, setData] = useState<IApi<IContactInfo> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  const GetData = function () {
    GetAxios<IApi<IContactInfo>>({
      path: APIs.contact_info,
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
      path: APIs.contact_info,
      payload,
      objectId: id,
      onSuccess: () => {
        GetData()
        setOpen(false)
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
