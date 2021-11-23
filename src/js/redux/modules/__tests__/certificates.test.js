import { constants, actions, reducers, initialState } from '../certificates';

describe('Certificates module tests', () => {
  const fakeCertificate = { id: 'id123' };

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).every(([name, value]) => {
      return value === `app/base/${name}`;
    });
  });

  it('should update the certificates list', () => {
    const action = actions.updateCertificates({ certificates: [fakeCertificate] });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('certificates')).toEqual([fakeCertificate]);
  });

  it('should update the pagination control', () => {
    const action = actions.updateCertificates(fakePaginationControl);
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('paginationControl')).toEqual(fakePaginationControl);
  });
});
