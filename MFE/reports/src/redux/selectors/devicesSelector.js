import { createSelector } from 'reselect';

export const devicesSelector = createSelector(
  state => state.devices,
  map => map.get('devices'),
);

export const favoriteDeviceSelector = createSelector(
  state => state.devices,
  map => map.get('favoriteDevices'),
);

export const paginationControlSelector = createSelector(
  state => state.devices,
  map => map.get('paginationControl'),
);

export const deviceDataSelector = createSelector(
  state => state.devices,
  map => map.get('deviceData'),
);

export const associatedDevicesSelector = createSelector(
  state => state.devices,
  map => map.get('associatedDevices'),
);

export const devicesWithOtherCertificatesSelector = createSelector(
  state => state.devices,
  map => map.get('devicesWithOtherCertificates'),
);

export const notAssociatedDevicesSelector = createSelector(
  state => state.devices,
  map => map.get('notAssociatedDevices'),
);
