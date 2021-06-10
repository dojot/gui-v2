import axios from 'axios';
import { URL } from 'Constants';
import { clearUserInformation } from 'Utils';

const { apiUrl } = __CONFIG__;

const graphql = axios.create({ baseURL: apiUrl });

const rest = axios.create({ baseURL: apiUrl });

graphql.interceptors.response.use(
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
      clearUserInformation();
      window.location.href = `${URL.LOGOUT}?return=/v2/#/welcome`;
    }
    return Promise.reject(error);
  },
);

rest.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      clearUserInformation();
      window.location.href = `${URL.LOGOUT}?return=/v2/#/welcome`;
    }
    return Promise.reject(error);
  },
);

export const protectAPI = query => {
  return graphql.post(URL.GQL, query, { withCredentials: true });
};

export const restAPI = path => {
  return rest.get(path, { withCredentials: true });
};
