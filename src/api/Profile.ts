import fetcher from './fetch';

export default function getProfileData(id: number) {
  return fetcher.get(`/users/${id}`);
} 