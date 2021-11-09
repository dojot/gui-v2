import { protectAPI } from 'APIs';

export const getCertificationAuthoritiesList = (page, filter) => {
  return protectAPI({
    query: `
      query getCertificationAuthorities($page: PageInput, $filter: FilterDeviceInput) {
        getCertificationAuthorities(page: $page, filter: $filter) {
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

export const deleteCertificationAuthority = certificationAuthorityId => {
  return protectAPI({
    query: `
      mutation deleteDevice($certificationAuthorityId: String!) {
        deleteDevice(deviceId: $certificationAuthorityId) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      certificationAuthorityId,
    }),
  });
};

export const deleteMultipleCertificationAuthorities = certificationAuthoritiesIdArray => {
  return protectAPI({
    query: `
      mutation deleteMultipleCertificationAuthorities($deviceIdArray: [String]!) {
        deleteMultipleDevices(certificationAuthoritiesIdArray: $certificationAuthoritiesIdArray) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      certificationAuthoritiesIdArray,
    }),
  });
};

export const getCertificationAuthoritiesHistoryParsed = filter => {
  return protectAPI(filter);
};
