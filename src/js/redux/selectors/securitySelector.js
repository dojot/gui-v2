import { createSelector } from 'reselect';

export const certificateSelector = createSelector(
  state => state.security,
  payload => payload.get('certificates'),
);

export const loadingCertificateSelector = createSelector(
  state => state.security,
  payload => payload.get('loading'),
);

export const paginationControlSelector = createSelector(
  state => state.security,
  payload => payload.get('paginationControl'),
);
