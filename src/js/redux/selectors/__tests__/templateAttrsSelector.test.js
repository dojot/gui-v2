import { Map } from 'immutable';

import { attrsSelector, paginationControlSelector } from '../templateAttrsSelector';

describe('Certificates selector tests', () => {
  const fakeTemplateAttrs = [{ id: 'id123' }];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  const fakeState = {
    templateAttrs: Map({
      attrs: fakeTemplateAttrs,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of template attrs', () => {
    expect(attrsSelector(fakeState)).toEqual(fakeTemplateAttrs);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });
});
