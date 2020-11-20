import fetcher from './fetch';

export default function allusers() {
  return fetcher.get('/users');
} 