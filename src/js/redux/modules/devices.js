import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

import type { devicesRet } from 'Types/device';

const GET_DEVICES = 'app/devices/GET_DEVICES';
const UPDATE_DEVICES = 'app/devices/UPDATE_DEVICES';

export const constants = {
  GET_DEVICES,
  UPDATE_DEVICES,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getDevices = createAction(GET_DEVICES, () => ({}));
export const updateDevices = createAction(
  UPDATE_DEVICES,
  (devices: devicesRet) => ({ devices }),
);

export const actions = {
  getDevices,
  updateDevices,
};

export const reducers = {
  [UPDATE_DEVICES]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
};

export const initialState = () =>
  Map({
    devices: [],
  });

export default handleActions(reducers, initialState());
