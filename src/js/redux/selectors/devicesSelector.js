import { createSelector } from 'reselect';

export const devicesSelector = createSelector(
  state => state.devices,
  map => map.get('devices'),
);

export const loadingDevicesSelector = createSelector(
  state => state.devices,
  map => map.get('loading'),
);

export const paginationControlSelector = createSelector(
  state => state.devices,
  map => map.get('paginationControl'),
);

export const devicesWithAttrLengthSelector = createSelector(devicesSelector, devices => {
  return devices.map(device => ({ ...device, attrsLength: device.attrs?.length || 0 }));
});
