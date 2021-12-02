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
            certificate {
              id
              label
            }
            attrs {
              id
              type
              label
              valueType
              isDynamic
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
            staticValue
          }
          certificate {
            id
            label
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

export const deleteDevices = deviceIds => {
  return protectAPI({
    query: `
      mutation deleteDevices($deviceIds: [String]!) {
        deleteDevices(deviceIds: $deviceIds)
      }
    `,
    variables: JSON.stringify({
      deviceIds,
    }),
  });
};

export const favoriteDevice = ({ deviceId, user, tenant }) => {
  return protectAPI({
    query: `
      mutation favoriteDevice($deviceId: String!, $user: String, $tenant: String!) {
        favoriteDevice(deviceId: $deviceId, user: $user, tenant: $tenant)
      }
    `,
    variables: JSON.stringify({
      deviceId,
      user,
      tenant,
    }),
  });
};

export const favoriteMultipleDevices = ({ deviceIdArray, user, tenant }) => {
  return protectAPI({
    query: `
      mutation favoriteMultipleDevices($deviceIdArray: [String]!, $user: String, $tenant: String!) {
        favoriteMultipleDevices(deviceIdArray: $deviceIdArray, user: $user, tenant: $tenant)
      }
    `,
    variables: JSON.stringify({
      deviceIdArray,
      user,
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

export const createDevice = ({ label, templates, attrs, certificate }) => {
  return protectAPI({
    query: `
      mutation createDevice($label: String!, $templates: [Int]!, $attrs: [DeviceAttributes], $certificate: String) {
        createDevice(label: $label, templates: $templates, attrs: $attrs, certificate: $certificate) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      label,
      templates,
      attrs,
      certificate,
    }),
  });
};

export const getDevicesHistoryParsed = filter => {
  return protectAPI(filter);
};
