import fetcher from './fetch';

export default function sendAvatar(formData: any) {
    const config = {
        headers: {
            "Contetnt-Type":"multipart/form-data" 
        }
    };
  return fetcher.post('/upload', formData, config)
  .then(res => {
      console.log({res});
  }).catch(err => {
      console.error({err});
  });
} 

