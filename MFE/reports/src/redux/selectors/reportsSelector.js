import { createSelector } from 'reselect';

export const reportsSelector = createSelector(
  state => state.reports,
  map => map.get('reports'),
);

export const paginationControlSelector = createSelector(
  state => state.reports,
  map => map.get('paginationControl'),
);
