/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import fetcher from './fetch';

export const getProfileData = () => fetcher.get('/users/profile')
  .then((data) => data.data.payload.users);

export function sendAvatar(formData: any) {
  const config = {
    headers: {
      'Contetnt-Type': 'multipart/form-data',
    },
  };
  return fetcher.post('/upload', formData, config)
    .then((res) => {
      console.log({ res });
    }).catch((err) => {
      console.error({ err });
    });
}

export function sendAbout(id: number, about: string) {
  return fetcher.put(`/users/${id}`, { about }).then((data) => {
    console.log(data);
  });
}

export function register(email: string, password: string, fullname:string, age:number) {
  return fetcher.post('/register', {
    email, password, fullname, age,
  }).then((data) => {
    console.log(data);
    localStorage.setItem('token', JSON.stringify(data.data.payload.token));
    return data;
  }).catch((fata) => {
    console.log(fata);
    return fata;
  });
}

export function login(email: string, password: string) {
  return fetcher.post('/auth', { email, password }).then((data) => {
    console.log(data);
    localStorage.setItem('token', JSON.stringify(data.data.payload.token));
    return data;
  });
}

export function allusers() {
  return fetcher.get('/users');
}
