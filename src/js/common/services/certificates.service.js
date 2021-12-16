import { protectAPI } from 'APIs';

export const getCertificateList = (page, filter) => {
  return protectAPI({
    query: `
      query getCertificateList($page: PageInput, $filter: FilterCertificateInput) {
        getCertificateList(page: $page, filter:$filter) {
          pagination {
            currentPage
            totalPages
          }
          certificates {
            issuedByDojotPki
            autoRegistered
            subjectDN
            fingerprint
            pem
            tenant
            createdAt
            modifiedAt
            belongsTo {
              device
            }
            validity {
              notBefore
              notAfter
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

export const deleteMultipleCertificates = certificatesIds => {
  return protectAPI({
    query: `
      mutation deleteMultipleCertificates($certificatesIds: [String]!) {
        deleteMultipleCertificates(certificatesIds: $certificatesIds) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      certificatesIds,
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
