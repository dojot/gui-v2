import { protectAPI } from 'APIs';

export const getCertificatesList = (page, filter) => {
  return protectAPI({
    query: `
      query getCertificates($page: PageInput, $filter: FilterDeviceInput) {
        getCertificates(page: $page, filter: $filter) {
          totalPages
          currentPage
          certificates {
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

export const deleteCertificate = certificateId => {
  return protectAPI({
    query: `
      mutation deleteCertificate($certificateId: String!) {
        deleteCertificate(certificateId: $certificateId) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      certificateId,
    }),
  });
};

export const deleteMultipleCertificates = certificatesIdArray => {
  return protectAPI({
    query: `
      mutation deleteMultipleCertificates($certificatesIdArray: [String]!) {
        deleteMultipleCertificates(certificatesIdArray: $certificatesIdArray) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      certificatesIdArray,
    }),
  });
};

export const disassociateDevice = certificate => {
  return protectAPI({
    query: `
      mutation disassociateDevice($certificate: [String]!) {
        disassociateDevice(certificate: $certificate) {
          id
          label
          validityPeriod
          status
          deviceId
        }
      }
    `,
    variables: JSON.stringify({
      certificate,
    }),
  });
};

export const getCertificatesHistoryParsed = filter => {
  return protectAPI(filter);
};
