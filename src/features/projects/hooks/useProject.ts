import GetAxios from '@/lib/GetAxios'
import { IProject } from '@/Model/IProject'
import { APIs } from '@/routes_Apis'
import { useState } from 'react'
import IApi, { IFilter } from '../../../Model/IApi'

interface getDataProps {
  filter?: IFilter
  page?: number
}

export function useProject() {
  const [data, setData] = useState<IApi<IProject> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  interface IAPIforProject extends IApi<IProject> {
    total: number
  }

  const getData = async function (props: getDataProps) {
    GetAxios<IAPIforProject>({
      filter: props.filter ? [{ ...props.filter }] : [],
      page: props.page,
      path: APIs.project,
      setLoading,
      onSuccess: teams => setData(teams),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  return { getData, data, loading, snackbarmsg, snackbarOpen, snackbarColor }
}
