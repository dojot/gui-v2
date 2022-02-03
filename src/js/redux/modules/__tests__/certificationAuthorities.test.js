import { constants, actions, reducers, initialState } from '../certificationAuthorities';

describe('Certification authorities module tests', () => {
  const fakeCertificationAuthority = { id: 'id123' };

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
    itemsPerPage: 10,
  };

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).forEach(([key, value]) => {
      expect(value).toBe(`app/certificationAuthorities/${key}`);
    });
  });

  it('should update the certification authorities list', () => {
    const action = actions.updateCertificationAuthorities({
      certificationAuthorities: [fakeCertificationAuthority],
    });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('certificationAuthorities')).toEqual([fakeCertificationAuthority]);
  });

  it('should update the pagination control', () => {
    const action = actions.updateCertificationAuthorities({
      paginationControl: fakePaginationControl,
    });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('paginationControl')).toEqual(fakePaginationControl);
  });
});
