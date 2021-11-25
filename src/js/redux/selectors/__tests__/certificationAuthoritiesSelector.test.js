import { Map } from 'immutable';

import {
  certificationAuthoritiesSelector,
  paginationControlSelector,
} from '../certificationAuthoritiesSelector';

describe('Certification authorities selector tests', () => {
  const fakeCertificationAuthorities = [{ id: 'id123' }];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  const fakeState = {
    certificationAuthorities: Map({
      certificationAuthorities: fakeCertificationAuthorities,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of certification authorities', () => {
    expect(certificationAuthoritiesSelector(fakeState)).toEqual(fakeCertificationAuthorities);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });
});
