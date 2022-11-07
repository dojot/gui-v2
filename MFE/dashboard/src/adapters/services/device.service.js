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
          disabled
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

export const favoriteDevices = ({ deviceIds, user, tenant }) => {
  return protectAPI({
    query: `
      mutation favoriteDevices($deviceIds: [String]!, $user: String, $tenant: String!) {
        favoriteDevices(deviceIds: $deviceIds, user: $user, tenant: $tenant)
      }
    `,
    variables: JSON.stringify({
      deviceIds,
      user,
      tenant,
    }),
  });
};

export const editDevice = ({ id, label, templates, attrs, disabled }) => {
  return protectAPI({
    query: `
      mutation editDevice($id: String!, $label: String!, $templates: [Int]!, $attrs: [DeviceAttributes], $disabled: Boolean!) {
        editDevice(id: $id, label: $label, templates: $templates, attrs: $attrs, disabled: $disabled) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      id,
      label,
      templates,
      attrs,
      disabled,
    }),
  });
};

export const createDevice = ({ label, templates, attrs, fingerprint, disabled }) => {
  return protectAPI({
    query: `
      mutation createDevice($label: String!, $templates: [Int]!, $attrs: [DeviceAttributes], $fingerprint: String, $disabled: Boolean!) {
        createDevice(label: $label, templates: $templates, attrs: $attrs, fingerprint: $fingerprint, disabled: $disabled) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      label,
      templates,
      attrs,
      fingerprint,
      disabled,
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
