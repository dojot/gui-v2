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

export const deleteMultipleCertificates = fingerprints => {
  return protectAPI({
    query: `
      mutation deleteCertificates($fingerprints: [String]!) {
        deleteCertificates(fingerprints: $fingerprints)
      }
    `,
    variables: JSON.stringify({
      fingerprints,
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
