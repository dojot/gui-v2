import { createSelector } from 'reselect';

export const successToastSelector = createSelector(
  state => state.success,
  map => map.get('successToast'),
);
