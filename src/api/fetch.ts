/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from 'axios';
import baseURL from './config';

const fetcher = axios.create({
  baseURL,
});

fetcher.interceptors.request.use((config) => {
  const configure = config;
  let token = localStorage.getItem('token');
  if (token) {
    token = JSON.parse(token);
    configure.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// fetcher.interceptors.response((res) => {

// })

export default fetcher;
