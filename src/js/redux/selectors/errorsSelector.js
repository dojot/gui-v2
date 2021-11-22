import { createSelector } from 'reselect';

export const errorsSelector = createSelector(
  state => state.errors,
  map => map.get('errors'),
);
