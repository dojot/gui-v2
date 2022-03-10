import axios from 'axios';
import { clearUserInformation } from 'Utils';

import { history } from '../../app-history';

const { apiUrl } = __CONFIG__;

const graphql = axios.create({
  baseURL: apiUrl,
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
      history.push('/login');
    }

    return Promise.reject(error);
  },
);

export const protectAPI = query => {
  return graphql.post('graphql?', query);
};
