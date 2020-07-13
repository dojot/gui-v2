import { GQL_WIDGET_HISTORIC, GQL_DEVICES_LIST } from './queries';

export const getHistoryQuery = filter => {
  const variables = {
    filter,
  };
  return {
    query: GQL_WIDGET_HISTORIC,
    variables: JSON.stringify(variables),
  };
};

export const getDevicesListQuery = IDs => {
  const variables = {
    IDs,
  };
  return {
    query: GQL_DEVICES_LIST,
    variables: JSON.stringify(variables),
  };
};
