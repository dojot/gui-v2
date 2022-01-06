import { createSelector } from 'reselect';

export const devicesSelector = createSelector(
  state => state.devices,
  map => map.get('devices'),
);

export const paginationControlSelector = createSelector(
  state => state.devices,
  map => map.get('paginationControl'),
);

export const deviceDataSelector = createSelector(
  state => state.devices,
  map => map.get('deviceData'),
);
