import { protectAPI } from 'APIs';

export const getCertificationAuthoritiesList = (page, filter, sortBy) => {
  return protectAPI({
    query: `
      query getCertificationAuthorities($page: PageInput, $filter: FilterCertificationAuthoritiesInput, $sortBy: String) {
        getCertificationAuthorities(page: $page, filter: $filter) {
          pagination {
            totalPages
            currentPage
          }
          certificationAuthorities {
            allowAutoRegistration
            caFingerprint
            caPem
            subjectDN
            tenant
            createdAt
            modifiedAt
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
      sortBy,
    }),
  });
};

export const deleteMultipleCertificationAuthorities = fingerprints => {
  return protectAPI({
    query: `
      mutation deleteCertificationAuthorities($fingerprints: [String]!) {
        deleteCertificationAuthorities(fingerprints: $fingerprints)
      }
    `,
    variables: JSON.stringify({
      fingerprints,
    }),
  });
};

export const createCertificationAuthority = ({ caPem }) => {
  return protectAPI({
    query: `
      mutation createCertificationAuthority($caPem: String!) {
        createCertificationAuthority(caPem: $caPem)
      }
    `,
    variables: JSON.stringify({
      caPem,
    }),
  });
};

export const getCertificationAuthoritiesHistoryParsed = filter => {
  return protectAPI(filter);
};
