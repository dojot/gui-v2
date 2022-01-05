import { createSelector } from 'reselect';

export const devicesSelector = createSelector(
  state => state.devices,
  map => map.get('devices'),
);

export const paginationControlSelector = createSelector(
  state => state.devices,
  map => map.get('paginationControl'),
);

export const devicesForDataTableSelector = createSelector(devicesSelector, devices => {
  return devices.map(device => ({
    ...device,
    attrsLength: device.attrs?.length || 0,
    hasCertificate: !!device.certificate?.fingerprint,
  }));
});

export const deviceDataSelector = createSelector(
  state => state.devices,
  map => map.get('deviceData'),
);
