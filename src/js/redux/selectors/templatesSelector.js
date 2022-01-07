import { createSelector } from 'reselect';

export const templatesSelector = createSelector(
  state => state.templates,
  map => map.get('templates'),
);

export const templateDataSelector = createSelector(
  state => state.templates,
  map => map.get('templateData'),
);

export const paginationControlSelector = createSelector(
  state => state.templates,
  map => map.get('paginationControl'),
);
