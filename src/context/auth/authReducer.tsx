import { IActionAuth, IStateAuth } from '../../Model/IUser'

export const initialState: IStateAuth = {
  isAuthenticated: false,
  User: undefined
}

export const reducer = (state: IStateAuth, action: IActionAuth): IStateAuth => {
  switch (action.type) {
    case 'login':
      localStorage.setItem('token', JSON.stringify(action.token))
      localStorage.setItem('user', JSON.stringify(action.user))
      return {
        isAuthenticated: true,
        User: action.user
      }

    case 'logout':
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        isAuthenticated: false,
        User: undefined
      }
    default:
      return state
  }
}
