export default interface IUser {
  id?: string
  name: string
  userName: string
  startDate?: Date
}

export interface IUserLoginRequest {
  userName: string
  password: string
}

export interface IUserLoginResponse {
  status: string
  token: string
  user: IUser
}

export interface IStateAuth {
  isAuthenticated: boolean
  User: IUser | undefined
}

export interface IActionLogin {
  type: 'login' | 'auth-check'
  token: string
  user: IUser
}

export interface IActionLogout {
  type: 'logout'
}

export type IActionAuth = IActionLogin | IActionLogout
//sperated only for payload type, to avoid confusion with the action type
