import axios from 'axios';
import { clearUserInformation, redirectToLogout } from 'Utils';

const baseURL = `${window.location.origin}/backstage/`;

const rest = axios.create({
  baseURL,
  withCredentials: true,
});

rest.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    clearUserInformation();
    redirectToLogout('/v2/#/login');
  }

  return Promise.reject(error);
});

export const restAPI = path => {
  return rest.get(path);
};
