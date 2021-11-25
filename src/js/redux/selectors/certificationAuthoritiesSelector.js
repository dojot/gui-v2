import { createSelector } from 'reselect';

export const certificationAuthoritiesSelector = createSelector(
  state => state.certificationAuthorities,
  map => map.get('certificationAuthorities'),
);

export const paginationControlSelector = createSelector(
  state => state.certificationAuthorities,
  map => map.get('paginationControl'),
);
