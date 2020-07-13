import { createSelector } from 'reselect';

const devicesDataSelector = state => state.devices;

const resultSelector = createSelector(devicesDataSelector, payload =>
  payload.get('devices'),
);

export const devicesList = state => ({
  devices: resultSelector(state),
});
