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
          attrs {
            label
            valueType
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

export const editDevice = ({ deviceId, label, templates, attrs }) => {
  return protectAPI({
    query: `
      mutation editDevice($deviceId: String!, $label: String!, $templates: [Template]!, $attrs: [Attr]) {
        editDevice(deviceId: $deviceId, label: $label, templates: $templates, attrs: $attrs)
      }
    `,
    variables: JSON.stringify({
      deviceId,
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
