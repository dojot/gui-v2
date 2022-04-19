import { Map } from 'immutable';

import {
  certificatesSelector,
  paginationControlSelector,
  certificateDataSelector,
  certificateDetailsSelector,
} from '../certificatesSelector';

describe('Certificates selector tests', () => {
  const createCertificate = id => ({ id });

  const fakeCertificates = [createCertificate('1')];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  const fakeState = {
    certificates: Map({
      certificates: fakeCertificates,
      certificateData: createCertificate('2'),
      certificateDetails: createCertificate('3'),
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of certificates', () => {
    expect(certificatesSelector(fakeState)).toEqual(fakeCertificates);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });

  it('should return the certificate data', () => {
    expect(certificateDataSelector(fakeState)).toEqual(createCertificate('2'));
  });

  it('should return the certificate details', () => {
    expect(certificateDetailsSelector(fakeState)).toEqual(createCertificate('3'));
  });
});
