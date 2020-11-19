import {LOGIN_USER} from '../actionTypes'

export const loginUser = (email: string, password: string, token: string) => ({
  type: LOGIN_USER,
  email,
  password,
  token,
});