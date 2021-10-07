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
            updated
            created
            attrs{
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

export const deleteDevice = deviceId => {
  return protectAPI({
    query: `
      mutation deleteDevice($deviceId: String!) {
        deleteDevice(deviceId: $deviceId) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      deviceId,
    }),
  });
};

export const deleteMultipleDevices = deviceIdArray => {
  return protectAPI({
    query: `
      mutation deleteMultipleDevices($deviceIdArray: [String]!) {
        deleteMultipleDevices(deviceIdArray: $deviceIdArray) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      deviceIdArray,
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
