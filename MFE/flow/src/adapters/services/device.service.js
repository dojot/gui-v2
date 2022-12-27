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

export const getCompleteDevice = (page, filter, sortBy) => {
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
            disabled
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

export const getTemplatesList = (page, filter, sortBy) => {
  return protectAPI({
    query: `
    query getTemplates($page: PageInput, $filter: FilterTemplateInput, $sortBy: String) {
      getTemplates(page: $page, filter: $filter, sortBy: $sortBy) {
        totalPages
        currentPage
        templates {
          id
          label
          created
          attrs {
            id
            type
            label
            created
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
