import { createSelector } from 'reselect';

export const templatesSelector = createSelector(
  state => state.templates,
  map => map.get('templates'),
);

export const loadingDevicesSelector = createSelector(
  state => state.templates,
  map => map.get('loading'),
);

export const paginationControlSelector = createSelector(
  state => state.templates,
  map => map.get('paginationControl'),
);
