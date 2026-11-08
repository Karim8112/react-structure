import DeleteAxios from '@/lib/DeleteAxios'
import GetAxios from '@/lib/GetAxios'
import GetOneAxios from '@/lib/GetOneAxios'
import { House } from '@/Model/IEstate'
import { APIs, routes } from '@/routes_Apis'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import IApi, { IFilter } from '../../../Model/IApi'

interface getDataProps {
  filter?: IFilter
  page?: number
}

export function useHouse() {
  const navigate = useNavigate()

  const [data, setData] = useState<IApi<House> | null>(null)
  const [oneHouse, setOneHouse] = useState<House | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [deletLoading, setDeleteLoading] = useState<boolean>(false)
  const [snackbarmsg, setSnackbarmsg] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<'success' | 'danger'>(
    'success'
  )

  interface IAPIforHouset extends IApi<House> {
    total: number
  }

  const getOne = async function ({ id }: { id: string }) {
    GetOneAxios<House>({
      path: APIs.house,
      ObjectId: id,
      setLoading,
      onSuccess: house => setOneHouse(house),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  const getData = async function (props: getDataProps) {
    GetAxios<IAPIforHouset>({
      filter: props.filter ? [{ ...props.filter }] : [],
      page: props.page,
      path: APIs.house,
      setLoading,
      onSuccess: houses => setData(houses),
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor
    })
  }

  const Delete = ({
    memberId,
    setOpen
  }: {
    memberId: string
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    DeleteAxios<IApi<House>>({
      ObjectId: memberId,
      path: APIs.house,
      setLoading: setDeleteLoading,
      setSnackbarmsg,
      setSnackbarOpen,
      setSnackbarColor,
      onSuccess() {
        setTimeout(() => {
          if (setOpen) setOpen(false)
          navigate(routes.houses)
        }, 1000)
      }
    })
  }

  return {
    getData,
    data,
    oneHouse,
    loading,
    deletLoading,
    snackbarmsg,
    snackbarOpen,
    snackbarColor,
    getOne,
    Delete
  }
}
