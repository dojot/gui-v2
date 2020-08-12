import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_DEVICES = 'app/devices/GET_DEVICES';
const UPDATE_DEVICES = 'app/devices/UPDATE_DEVICES';

export const constants = {
  GET_DEVICES,
  UPDATE_DEVICES,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getDevices = createAction(GET_DEVICES, payload => ({
  page: payload.page,
  filter: payload.filter,
}));
export const updateDevices = createAction(UPDATE_DEVICES, payload => ({
  devices: payload.devices,
  paginationControl: {
    totalPages: payload.totalPages,
    currentPage: payload.currentPage,
  },
}));

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
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });

export default handleActions(reducers, initialState());
