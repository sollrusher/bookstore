import fetcher from './fetch';

export function login(email: string, password: string) {
  return fetcher.post('/auth', { email, password });
} 