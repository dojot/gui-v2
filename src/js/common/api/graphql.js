import axios from 'axios';
import { clearUserInformation, redirectToLogout } from 'Utils';

const { apiUrl } = __CONFIG__;

const endsWithSlash = apiUrl?.endsWith('/') || false;
const backstageUrl = 'backstage/graphql';
const baseURL = `${apiUrl}${endsWithSlash ? '' : '/'}${backstageUrl}`;

const graphql = axios.create({
  baseURL,
  withCredentials: true,
});

graphql.interceptors.response.use(
  response => {
    const { errors, data } = response.data;
    if (errors) return Promise.reject(errors);
    return data;
  },
  error => {
    if (error.response.status === 401) {
      clearUserInformation();
      redirectToLogout('/v2/#/login');
    }

    return Promise.reject(error);
  },
);

export const protectAPI = query => {
  return graphql.post('/', query);
};
