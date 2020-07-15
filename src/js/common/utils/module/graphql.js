import {
  GQL_WIDGET_HISTORIC,
  GQL_DEVICES_LIST,
  GQL_USER_TOKEN,
} from './queries';

export const getHistoryQuery = filter => {
  const variables = {
    filter,
  };
  return {
    query: GQL_WIDGET_HISTORIC,
    variables: JSON.stringify(variables),
  };
};

export const getDevicesListQuery = (page, filter) => {
  const variables = {
    page,
    filter,
  };
  return {
    query: GQL_DEVICES_LIST,
    variables: JSON.stringify(variables),
  };
};

export const getUserTokenQuery = (username, passwd) => {
  const variables = {
    username,
    passwd,
  };
  return {
    query: GQL_USER_TOKEN,
    variables: JSON.stringify(variables),
  };
};
