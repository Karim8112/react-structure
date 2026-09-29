import axios from 'axios'

import { toast } from '@/hooks/use-toast'
import React, { useEffect } from 'react'

const Toast: React.ReactNode = React.createElement('p', {
  className: 'mt-2 w-[340px] rounded-md bg-destructive p-4 text-white'
})

enum RESTtype {
  post = 'post'
}
export type IREST = {
  setError: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  onSuccess: () => void
  onError: () => void
  path: string
  type: RESTtype
}

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
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
  response => {
    if (response.status == 200) return response.data
    if (response.status == 401) {
      // remove cookie
      // navigate to login page
    }
  },

  error => {
    console.log('Logging the error', error)
    toast({
      title: 'Opps, something wrong',
      description: Toast
    })

    return Promise.reject(error)
  }
)

const RESTAxios = function (props: IREST) {
  useEffect(() => {
    props.setLoading(true)
    switch (props.type) {
      case RESTtype.post:
        API.post({ URL: props.path })
        console.log('test')
    }
  })
  return props.onSuccess
}

export default RESTAxios
