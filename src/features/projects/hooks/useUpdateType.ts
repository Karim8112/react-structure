import PatchAxios from '@/lib/PatchAxios'
import { useState } from 'react'
import { APIs } from '../../../routes_Apis'
export function useUpdateType({
  setOpen,
  id,
  Refresh
}: {
  setOpen: React.Dispatch<React.SetStateAction<null | string>>
  id: string
  Refresh?: () => void
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  const Update = (text: string) => {
    PatchAxios<Record<string, unknown>, unknown>({
      objectId: id,
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
        if (Refresh) Refresh()
        // setHiddenRows(hiddenRows => {
        //   return [...hiddenRows, id]
        // })
        setOpen(null)
      },
      onError() {
        setTimeout(() => {
          setSnackbarOpen(false)
        }, 3000)
        setOpen(null)
      }
    })
  }

  return { Update, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
