import { protectAPI } from 'APIs';

const GQL_WIDGET_HISTORIC = `
query getDeviceHistory($filter: HistoryInput!) {
  getDeviceHistoryForDashboard(filter: $filter)
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
  const { isRealTime, ...restFilter } = filter;
  const variables = {
    filter: restFilter,
  };
  return {
    query: GQL_WIDGET_HISTORIC,
    variables: JSON.stringify(variables),
    isRealTime: filter.isRealTime,
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
