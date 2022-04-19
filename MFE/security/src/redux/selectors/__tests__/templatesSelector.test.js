import { Map } from 'immutable';

import {
  templatesSelector,
  templateDataSelector,
  paginationControlSelector,
} from '../templatesSelector';

describe('Templates selector tests', () => {
  const fakeTemplateData = {
    id: 'id123',
    label: 'Template Name',
    attrs: [{ id: 'abc123', label: 'Attr 1' }],
  };

  const fakeTemplates = [fakeTemplateData];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
    itemsPerPage: 10,
  };

  const fakeState = {
    templates: Map({
      templates: fakeTemplates,
      templateData: fakeTemplateData,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of templates', () => {
    expect(templatesSelector(fakeState)).toEqual(fakeTemplates);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });

  it('should return the template data', () => {
    expect(templateDataSelector(fakeState)).toEqual(fakeTemplateData);
  });
});
