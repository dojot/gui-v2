import { Map } from 'immutable';

import { templatesSelector, paginationControlSelector } from '../templatesSelector';

describe('Certificates selector tests', () => {
  const fakeTemplates = [{ id: 'id123' }];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  const fakeState = {
    templates: Map({
      templates: fakeTemplates,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of templates', () => {
    expect(templatesSelector(fakeState)).toEqual(fakeTemplates);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });
});
