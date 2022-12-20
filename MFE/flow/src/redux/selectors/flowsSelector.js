import { createSelector } from 'reselect';

export const flowsSelector = createSelector(
  state => state.flows,
  map => map.get('flows'),
);

export const flowDataSelector = createSelector(
  state => state.flows,
  map => map.get('flowData'),
);

export const selectedFlowSelector = createSelector(
  state => state.flows,
  map => map.get('selectedFlow'),
);
