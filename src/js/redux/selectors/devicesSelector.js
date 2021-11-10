import { createSelector } from 'reselect';

export const devicesSelector = createSelector(
  state => state.devices,
  map => map.get('devices'),
);

export const paginationControlSelector = createSelector(
  state => state.devices,
  map => map.get('paginationControl'),
);

export const devicesWithAttrLengthSelector = createSelector(devicesSelector, devices => {
  return devices.map(device => ({ ...device, attrsLength: device.attrs?.length || 0 }));
});

export const firstDeviceSelector = createSelector(
  state => state.devices,
  map => {
    const devices = map.get('devices');
    if (devices?.length) return devices[0];
    return null;
  },
);
