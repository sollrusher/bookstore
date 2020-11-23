import fetcher from './fetch';

export function login(email: string, password: string) {
  return fetcher.post('/auth', { email, password }).then(data => {
    console.log(data)
    localStorage.setItem("token", JSON.stringify(data.data.payload.token));
    return data
  });
} 