import axios from 'axios';
import {baseURL} from './config'

const fetcher = axios.create({
  baseURL: baseURL
});

fetcher.interceptors.request.use((config) => {
  let token = localStorage.getItem("token")
    if(token)
    {token = JSON.parse(token);}

  config.headers.Authorization = `Bearer ${token}`
  return config
})

// fetcher.interceptors.response((res) => {

// })

export default fetcher;