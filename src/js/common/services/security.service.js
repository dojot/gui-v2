import { protectAPI } from 'APIs';

export const getCertificateList = page => {
  return protectAPI({
    query: `
    query getCertificates($page: PageInput) {
      getCertificates(page: $page) {
        totalPages
        currentPage
      }
    }
    `,
    variables: JSON.stringify({
      page,
    }),
  });
};

export const deleteCertificate = certificateId => {
  return protectAPI({
    query: `
      mutation deleteCertificate($certificateId: String!) {
        deleteCertificate(certificateId: $certificateId)
      }
    `,
    variables: JSON.stringify({
      certificateId,
    }),
  });
};

export const createOneClickCertificate = () => {
  return protectAPI({
    query: `
      mutation createOneClickCertificate() {
        createOneClickCertificate()
      }
    `,
  });
};

export const attachCertificate = (certificateId, deviceId) => {
  return protectAPI({
    query: `
      mutation attachCertificate($certificateId: String!, $deviceId: String!) {
        attachCertificate(certificateId: $certificateId, deviceId: $deviceId)
      }
    `,
    variables: JSON.stringify({
      certificateId,
      deviceId,
    }),
  });
};

export const detachCertificate = certificateId => {
  return protectAPI({
    query: `
      mutation detachCertificate($certificateId: String!) {
        detachCertificate(certificateId: $certificateId)
      }
    `,
    variables: JSON.stringify({
      certificateId,
    }),
  });
};
