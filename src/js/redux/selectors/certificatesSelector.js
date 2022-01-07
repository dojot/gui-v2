import { createSelector } from 'reselect';

export const certificatesSelector = createSelector(
  state => state.certificates,
  map => map.get('certificates'),
);

export const paginationControlSelector = createSelector(
  state => state.certificates,
  map => map.get('paginationControl'),
);

export const certificateDataSelector = createSelector(
  state => state.certificates,
  map => map.get('certificateData'),
);
