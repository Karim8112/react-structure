// const BaseURL: string = import.meta.env.VITE_BASE_API_URL
// const path = '/login'
export interface ILoginPayload {
  identifier: string
  password: string
}
export interface ILoginResponse {
  token: string
  user: {
    id: number
    userName: string
    name: string
  }
}

// export interface IRegisterPayload {
//   email: string
//   username: string
//   password: string
// }

// // this has to be deleted
// export const register = async (
//   payload: IRegisterPayload
// ): Promise<AxiosResponse> => {
//   return await API.post('/api/auth/local/register', payload)
// }

// export const login = async (
//   payload: ILoginPayload
// ): Promise<ILoginResponse> => {
//   return await API.post(BaseURL.concat(path), payload)
// }
