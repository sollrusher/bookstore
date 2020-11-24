import fetcher from './fetch';

export function sendAbout(id: number, about: string) {
  return fetcher.put(`/users/${id}`, { about }).then(data =>{
    console.log(data)
  });
} 