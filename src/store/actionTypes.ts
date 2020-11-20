export const LOGIN_USER = 'LOGIN_USER/Login';

interface LoginUserAction {
  type: typeof LOGIN_USER
  id: number
  email: string
  password: string
  token: string
}

export type LoginType = LoginUserAction