import { protectAPI } from 'APIs';

const GQL_WIDGET_HISTORIC = `
query getDeviceHistory($filter: HistoryInput!, $configs: ConfigsInput) {
  getDeviceHistoryForDashboard(filter: $filter, configs: $configs)
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
        isDynamic
        staticValue
      }
    }
  }
}
`;

export const parseHistoryQuery = (filter, configs, isRealTime) => {
  const variables = {
    filter,
    configs,
  };
  return {
    query: GQL_WIDGET_HISTORIC,
    variables: JSON.stringify(variables),
    isRealTime,
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
