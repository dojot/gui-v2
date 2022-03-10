import axios from 'axios';
import { clearUserInformation } from 'Utils';

import { history } from '../../app-history';

const { apiUrl } = __CONFIG__;

const rest = axios.create({
  baseURL: `${apiUrl}/backstage`,
  withCredentials: true,
});

rest.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    clearUserInformation();
    history.push('/login');
  }

  return Promise.reject(error);
});

export const restAPI = path => {
  return rest.get(path, { withCredentials: true });
};
