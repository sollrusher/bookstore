export const LOGIN_USER = 'LOGIN_USER/Login';
export const INIT_USER = 'INIT_USER/Login';

interface LoginUserAction {
  type: typeof LOGIN_USER
  id: number
  email: string
  fullname: string
  age: number
  about: string
}

interface InitUserAction {
  type: typeof INIT_USER
}

export type LoginActionType = LoginUserAction | InitUserAction
