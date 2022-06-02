import { protectAPI } from 'APIs';

export const getDevicesList = (page, filter) => {
  return protectAPI({
    query: `
      query getDevices($page: PageInput, $filter: FilterDeviceInput) {
        getDevices(page: $page, filter: $filter) {
          totalPages
          currentPage
          devices {
            id
            label
            created
            updated
            favorite
            certificate {
              fingerprint
            }
            attrs {
              id
              type
              label
              valueType
              isDynamic
              templateId
              staticValue
            }
          }
        }
      }
    `,
    variables: JSON.stringify({
      page,
      filter,
    }),
  });
};

export const getFavoriteDevicesList = (user, tenant) => {
  return protectAPI({
    query: `
      query getFavoriteDevicesList($user: String!, $tenant: String!) {
        getFavoriteDevicesList(user: $user, tenant: $tenant) {
          id
          label
        }
      }
    `,
    variables: JSON.stringify({
      user,
      tenant,
    }),
  });
};

export const getDeviceById = deviceId => {
  return protectAPI({
    query: `
      query getDeviceById($deviceId: String!) {
        getDeviceById(deviceId: $deviceId) {
          id
          label
          created
          updated
          attrs {
            id
            type
            label
            valueType
            templateId
            staticValue
          }
          certificate {
            fingerprint
          }
          templates {
            id
            label
          }
          lastUpdate {
            date
            label
            value
          }
        }
      }
    `,
    variables: JSON.stringify({
      deviceId,
    }),
  });
};

export const deleteDevices = (deviceIds, userName, tenant) => {
  return protectAPI({
    query: `
      mutation deleteDevices($deviceIds: [String]!, $userName: String!, $tenant: String!) {
        deleteDevices(deviceIds: $deviceIds, userName: $userName, tenant: $tenant)
      }
    `,
    variables: JSON.stringify({
      deviceIds,
      userName,
      tenant,
    }),
  });
};

export const favoriteDevices = ({ deviceIds, userName, tenant }) => {
  return protectAPI({
    query: `
      mutation favoriteDevices($deviceIds: [String]!, $userName: String!, $tenant: String!) {
        favoriteDevices(deviceIds: $deviceIds, userName: $userName, tenant: $tenant)
      }
    `,
    variables: JSON.stringify({
      deviceIds,
      userName,
      tenant,
    }),
  });
};

export const editDevice = ({ id, label, templates, attrs }) => {
  return protectAPI({
    query: `
      mutation editDevice($id: String!, $label: String!, $templates: [Int]!, $attrs: [DeviceAttributes]) {
        editDevice(id: $id, label: $label, templates: $templates, attrs: $attrs) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      id,
      label,
      templates,
      attrs,
    }),
  });
};

export const createDevice = ({ label, templates, attrs, fingerprint }) => {
  return protectAPI({
    query: `
      mutation createDevice($label: String!, $templates: [Int]!, $attrs: [DeviceAttributes], $fingerprint: String) {
        createDevice(label: $label, templates: $templates, attrs: $attrs, fingerprint: $fingerprint) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      label,
      templates,
      attrs,
      fingerprint,
    }),
  });
};

export const getDevicesHistoryParsed = filter => {
  return protectAPI(filter);
};

export const parseHistoryQuery = (filter, configs, isRealTime) => {
  return {
    query: `
      query getDeviceHistory($filter: HistoryInput!, $configs: ConfigsInput) {
        getDeviceHistoryForDashboard(filter: $filter, configs: $configs)
      }
    `,
    variables: JSON.stringify({
      filter,
      configs,
    }),
    isRealTime,
  };
};
