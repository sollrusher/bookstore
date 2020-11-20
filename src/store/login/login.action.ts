import {LOGIN_USER, LoginType} from '../actionTypes'

export const loginUser = (id: number, email: string, password: string, token: string):LoginType => ({
  type: LOGIN_USER,
  id,
  email,
  password,
  token,
});