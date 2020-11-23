import fetcher from './fetch';

export function register(email: string, password: string, fullname:string, age:number) {
  return fetcher.post('/register', { email, password, fullname, age }).then(data => {
    console.log(data)
    localStorage.setItem("token", JSON.stringify(data.data.payload.token));
    return data
  });
} 