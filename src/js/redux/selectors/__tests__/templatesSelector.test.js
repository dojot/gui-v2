import { Map } from 'immutable';

import {
  templatesSelector,
  paginationControlSelector,
  templatesForDataTableSelector,
} from '../templatesSelector';

describe('Templates selector tests', () => {
  const fakeTemplateData = {
    id: 'id123',
    label: 'Template Name',
    attrs: [{ id: 'abc123', label: 'Attr 1' }],
  };

  const fakeTemplateDataForDataTable = {
    ...fakeTemplateData,
    attrsLength: fakeTemplateData.attrs.length,
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
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of templates', () => {
    expect(templatesSelector(fakeState)).toEqual(fakeTemplates);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });

  it('should return the list of templates for the data table', () => {
    expect(templatesForDataTableSelector(fakeState)).toEqual([fakeTemplateDataForDataTable]);

    const templateWithoutAttrs = { ...fakeTemplateData };
    delete templateWithoutAttrs.attrs;
    const fakeStateWithoutAttrs = fakeState.templates.set('templates', [templateWithoutAttrs]);

    expect(templatesForDataTableSelector({ templates: fakeStateWithoutAttrs })).toEqual([
      {
        ...templateWithoutAttrs,
        attrsLength: 0,
      },
    ]);
  });
});
