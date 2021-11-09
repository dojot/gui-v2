import { createSelector } from 'reselect';

export const certificationAuthoritiesSelector = createSelector(
  state => state.certificationAuthorities,
  map => map.get('certificationAuthorities'),
);

export const loadingCertificationAuthoritiesSelector = createSelector(
  state => state.certificationAuthorities,
  map => map.get('loading'),
);

export const paginationControlSelector = createSelector(
  state => state.certificationAuthorities,
  map => map.get('paginationControl'),
);
