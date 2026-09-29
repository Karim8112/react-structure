import axios from 'axios'

import { toast } from '@/hooks/use-toast'
import React from 'react'

const Toast: React.ReactNode = React.createElement('p', {
  className: 'mt-2 w-[340px] rounded-md bg-destructive p-4 text-white'
})

export enum RESTtype {
  post = 'post'
}
export type IREST<RequestBody, ResponseBody> = {
  path: string
  type: RESTtype
  setError?: React.Dispatch<React.SetStateAction<boolean>>
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  onSuccess?: (data: ResponseBody) => void
  onError?: () => void

  payload?: RequestBody
  objectId?: string
}

export const API = axios.create({
  baseURL: 'https://pink-ant-682660.hostingersite.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

API.interceptors.request.use(
  config => {
    const authInfo = JSON.parse(localStorage.getItem('auth') || '{}')

    if (authInfo.token)
      config.headers.Authorization = `Bearer ${authInfo.token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  response => response.data,
  error => {
    const status = error.response?.status
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'

    console.log('Logging the error', errorMessage)

    if (status === 401) {
      localStorage.removeItem('token')
      toast({
        title: 'Session expired. Please log in again.'
      }) // Redirect to login page
      window.location.href = '/'
    } else {
      toast({
        title: 'Opps, something wrong',
        description: Toast
      })
    }

    return Promise.reject(error)
  }
)

const RESTAxios = async function <RequestBody, ResponseBody>(
  props: IREST<RequestBody, ResponseBody>
) {
  if (props.setLoading) props.setLoading(true)
  switch (props.type) {
    case RESTtype.post: {
      const data: ResponseBody = await API.post(props.path, props.payload)
      console.log(data)
      if (props.setLoading) props.setLoading(false)
      if (props.onSuccess) {
        props.onSuccess(data)
      }
    }
  }
}

export default RESTAxios
