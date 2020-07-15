import { createSelector } from 'reselect';

const devicesDataSelector = state => state.devices;

const resultSelector = createSelector(devicesDataSelector, payload => {
  return payload.get('devices');
});

export const devicesList = state => ({
  devices: resultSelector(state),
});

const paginationControlSelector = createSelector(
  devicesDataSelector,
  payload => {
    return payload.get('paginationControl');
  },
);

export const devicesListPaginationControl = state => ({
  paginationControl: paginationControlSelector(state),
});
