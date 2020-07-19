import { protectAPI } from 'APIs';

const GQL_WIDGET_HISTORIC = `
query getDeviceHistory($filter: HistoryInput!) {
  getDeviceHistory(filter: $filter) {
    label
    valueType
    deviceID
    value
    timestamp
  }
}
`;

const GQL_DEVICES_LIST = `
query getDevices($page: PageInput, $filter: FilterDeviceInput) {
  getDevices(page: $page, filter: $filter) {
    totalPages
    currentPage
    devices {
      id
      label
      attrs{
        label
        valueType
      }
    }
  }
}
`;

export const parseHistoryQuery = filter => {
  const variables = {
    filter,
  };
  return {
    query: GQL_WIDGET_HISTORIC,
    variables: JSON.stringify(variables),
  };
};

const parseDevicesListQuery = (page, filter) => {
  const variables = {
    page,
    filter,
  };
  return {
    query: GQL_DEVICES_LIST,
    variables: JSON.stringify(variables),
  };
};

export const getDevicesList = (page, filter) => {
  return protectAPI(parseDevicesListQuery(page, filter));
};

export const getDevicesHistoryParsed = filter => {
  return protectAPI(filter);
};
