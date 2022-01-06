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

export const disassociateDevice = fingerprint => {
  return protectAPI({
    query: `
      mutation disassociateDevice($fingerprint: String!) {
        disassociateDevice(fingerprint: $fingerprint)
      }
    `,
    variables: JSON.stringify({
      fingerprint,
    }),
  });
};

export const associateDevice = (fingerprint, deviceId) => {
  return protectAPI({
    query: `
      mutation associateDevice($fingerprint: String!, $deviceId: String!) {
        associateDevice(fingerprint: $fingerprint, deviceId: $deviceId)
      }
    `,
    variables: JSON.stringify({
      fingerprint,
      deviceId,
    }),
  });
};

export const createCertificateOneClick = commonName => {
  return protectAPI({
    query: `
      mutation createCertificateOneClick($commonName: String) {
        createCertificateOneClick(commonName: $commonName) {
          certificatePem
          certificateFingerprint
          privateKeyPEM
          publicKeyPEM
        }
      }
    `,
    variables: JSON.stringify({
      commonName,
    }),
  });
};

export const createCertificateCSR = csrPEM => {
  console.log(csrPEM);
  return protectAPI({
    query: `
      mutation createCertificateCSR($csrPEM: String!) {
        createCertificateCSR(csrPEM: $csrPEM) {
          certificatePem
          certificateFingerprint
          privateKeyPEM
          publicKeyPEM
        }
      }
    `,
    variables: JSON.stringify({
      csrPEM,
    }),
  });
};

// export const createCertificateCSR = () => {
//   return protectAPI({
//     query: `
//       mutation createCertificate() {
//         crea
//       }
//     `
//   })
// }
