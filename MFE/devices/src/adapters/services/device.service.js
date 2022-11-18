import { protectAPI } from '../api';

export const getDevicesList = (page, filter, sortBy) => {
  return protectAPI({
    query: `
      query getDevices($page: PageInput, $filter: FilterDeviceInput, $sortBy: String) {
        getDevices(page: $page, filter: $filter, sortBy: $sortBy) {
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
      sortBy,
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

export const createMultipleDevices = ({
  devicesPrefix,
  quantity,
  initialSuffixNumber,
  templates,
  attrs,
}) => {
  return protectAPI({
    query: `
      mutation createMultipleDevices($devicesPrefix: String!, $quantity: String!, $initialSuffixNumber: String!, $templates: [Int]!, $attrs: [DeviceAttributes]) {
        createMultipleDevices(devicesPrefix: $devicesPrefix, quantity: $quantity, initialSuffixNumber: $initialSuffixNumber, templates: $templates, attrs: $attrs) {
          devicesWithError
        }
      }
    `,
    variables: JSON.stringify({
      devicesPrefix,
      quantity,
      initialSuffixNumber,
      templates,
      attrs,
    }),
  });
};

export const createDevicesCSV = ({ csvFile }) => {
  return protectAPI({
    query: `
      mutation createDevicesCSV($csvFile: String!) {
        createDevicesCSV(csvFile: $csvFile) {
          createdDevices
          notCreatedDevices {
            id
            label
            errorMessage
          }
        }
      }
    `,
    variables: JSON.stringify({
      csvFile,
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

export const associateDevicesInBatch = ({ deviceIdArray }) => {
  return protectAPI({
    query: `
      mutation associateDevicesInBatch($deviceIdArray: [String]!) {
        associateDevicesInBatch(deviceIdArray: $deviceIdArray) {
          associatedDevices {
            label
          }
          devicesWithOtherCertificates {
            label
          }
          notAssociatedDevices {
            label
          }
        }
      }
    `,
    variables: JSON.stringify({
      deviceIdArray,
    }),
  });
};

export const actuate = ({ deviceId, labels, values }) => {
  return protectAPI({
    query: `
      mutation actuate($deviceId: String!, $labels: [String]!, $values: [String]!) {
        actuate(deviceId: $deviceId, labels: $labels, values: $values)
      }
    `,
    variables: JSON.stringify({
      deviceId,
      labels,
      values,
    }),
  });
};
