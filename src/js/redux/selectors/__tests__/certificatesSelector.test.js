import { Map } from 'immutable';

import { certificatesSelector, paginationControlSelector } from '../certificatesSelector';

describe('Certificates selector tests', () => {
  const fakeCertificates = [{ id: 'id123' }];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  const fakeState = {
    certificates: Map({
      certificates: fakeCertificates,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of certificates', () => {
    expect(certificatesSelector(fakeState)).toEqual(fakeCertificates);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });
});
