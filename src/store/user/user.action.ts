/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { LOGIN_USER, LoginType, INIT_USER } from '../actionTypes';

export const loginUser = (id: number, email: string, fullname: string, age: number, about: string):LoginType => ({
  type: LOGIN_USER,
  id,
  email,
  fullname,
  age,
  about,
});

export const initUser = ():LoginType => ({
  type: INIT_USER,
});
