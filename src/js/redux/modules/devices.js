import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_DEVICES = 'app/devices/GET_DEVICES';
const UPDATE_DEVICES = 'app/devices/UPDATE_DEVICES';
const LOADING = 'app/devices/LOADING';
const FAVORITE_DEVICE = 'app/devices/FAVORITE_DEVICE';
const DELETE_DEVICE = 'app/devices/DELETE_DEVICE';
const FAVORITE_MULTIPLE_DEVICES = 'app/devices/FAVORITE_MULTIPLE_DEVICES';
const DELETE_ALL_DEVICES = 'app/devices/DELETE_ALL_DEVICES';

export const constants = {
  GET_DEVICES,
  UPDATE_DEVICES,
  LOADING,
  FAVORITE_DEVICE,
  DELETE_DEVICE,
  FAVORITE_MULTIPLE_DEVICES,
  DELETE_ALL_DEVICES,
};

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

export const setLoadingDevices = createAction(LOADING, payload => ({
  loading: payload,
}));

export const favoriteDevice = createAction(FAVORITE_DEVICE, payload => ({
  deviceId: payload.deviceId,
}));

export const deleteDevice = createAction(DELETE_DEVICE, payload => ({
  deviceId: payload.deviceId,
}));

export const favoriteMultipleDevices = createAction(FAVORITE_MULTIPLE_DEVICES, payload => ({
  deviceIdArray: payload.deviceIdArray,
}));

export const deleteMultipleDevices = createAction(DELETE_ALL_DEVICES, payload => ({
  deviceIdArray: payload.deviceIdArray,
}));

export const actions = {
  getDevices,
  updateDevices,
  setLoadingDevices,
  favoriteDevice,
  deleteDevice,
  favoriteMultipleDevices,
  deleteMultipleDevices,
};

export const reducers = {
  [UPDATE_DEVICES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    devices: [],
    loading: false,
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });
};

export default handleActions(reducers, initialState());
