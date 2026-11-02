import DeleteAxios from '@/lib/DeleteAxios'
import GetAxios from '@/lib/GetAxios'
import PatchAxios from '@/lib/PatchAxios'
import PostAxios from '@/lib/PostAxios'
import { IWhatWeDo } from '@/Model/Landing'
import { APIs } from '@/routes_Apis'
import { useState } from 'react'
import IApi from '../../../Model/IApi'
export function useWhatWeDo() {
  const [data, setData] = useState<IApi<IWhatWeDo> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )
  const GetData = function () {
    GetAxios<IApi<IWhatWeDo>>({
      path: APIs.what_we_do,
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
      path: APIs.what_we_do,
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

  const Delete = function ({
    id,
    setOpen
  }: {
    id: string
    setOpen: React.Dispatch<React.SetStateAction<string | null>>
  }) {
    DeleteAxios<unknown>({
      path: APIs.what_we_do,
      ObjectId: id,
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

  const POST = function ({
    payload,
    setOpen
  }: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    payload: Record<string, unknown>
  }) {
    PostAxios<unknown, unknown>({
      path: APIs.what_we_do,
      payload,
      isFormData: true,
      setLoading: setActionLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess: () => {
        setOpen(false)
        GetData()
      }
    })
  }

  return {
    GetData,
    PatchData,
    Delete,
    POST,
    data,
    loading,
    actionLoading,
    snackbarmsg,
    snackbarOpen,
    snackbarColor
  }
}
