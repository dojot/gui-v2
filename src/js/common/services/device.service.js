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
      mutation deleteDevice($deviceId: String) {
        deleteDevice(deviceId: $deviceId)
      }
    `,
    variables: JSON.stringify({
      deviceId,
    }),
  });
};

export const deleteAllDevices = deviceIdArray => {
  return protectAPI({
    query: `
      mutation deleteAllDevices($deviceIdArray: [String]) {
        deleteAllDevices(deviceIdArray: $deviceIdArray)
      }
    `,
    variables: JSON.stringify({
      deviceIdArray,
    }),
  });
};

export const favoriteDevice = deviceId => {
  return protectAPI({
    query: `
      mutation favoriteDevice($deviceId: String) {
        favoriteDevice(deviceId: $deviceId)
      }
    `,
    variables: JSON.stringify({
      deviceId,
    }),
  });
};

export const favoriteAllDevices = deviceIdArray => {
  return protectAPI({
    query: `
      mutation favoriteAllDevices($deviceIdArray: [String]) {
        favoriteAllDevices(deviceIdArray: $deviceIdArray)
      }
    `,
    variables: JSON.stringify({
      deviceIdArray,
    }),
  });
};
