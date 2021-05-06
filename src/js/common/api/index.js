import axios from 'axios';
import { logout } from 'Utils';
import { getToken } from 'Utils/module/auth';

import { history } from '../../app-history';

const { apiUrl } = __CONFIG__;

const instance = axios.create({ baseURL: apiUrl });

instance.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    const {
      data: { errors, data },
    } = response;
    if (errors) {
      return Promise.reject(errors);
    }
    return data;
  },
  error => {
    if (error.response.status === 401) {
      logout();
      history.push('/login', null);
    }
    return Promise.reject(error);
  },
);

export const protectAPI = query => {
  return instance.post('graphql?', query);
};

export const unprotectedAPI = query => {
  return instance.post('graphql-auth/', query);
};
