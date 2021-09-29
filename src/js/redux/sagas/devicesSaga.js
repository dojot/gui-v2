// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { Device } from 'Services';

import { constants, actions } from '../modules/devices';
import { devicesSelector } from '../selectors/devicesSelector';

export function* handleGetDevices(action) {
  try {
    yield put(actions.setLoadingDevices(true));
    const { page, filter } = action.payload;
    const { getDevices } = yield Device.getDevicesList(page, filter);
    if (getDevices) yield put(actions.updateDevices(getDevices));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
  } finally {
    yield put(actions.setLoadingDevices(false));
  }
}

export function* handleDeleteDevice(action) {
  try {
    const { deviceId } = action.payload;
    yield Device.deleteDevice(deviceId);
    const devices = yield select(devicesSelector);
    const notDeletedDevices = devices.filter(({ id }) => id !== deviceId);
    yield put(actions.updateDevices({ devices: notDeletedDevices }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDeleteAllDevices(action) {
  try {
    const { deviceIdArray } = action.payload;
    yield Device.deleteAllDevices(deviceIdArray);
    const devices = yield select(devicesSelector);
    const notDeletedDevices = devices.filter(({ id }) => !deviceIdArray.includes(id));
    yield put(actions.updateDevices({ devices: notDeletedDevices }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleFavoriteDevice(action) {
  try {
    const { deviceId } = action.payload;
    yield Device.favoriteDevice(deviceId);
    const devices = yield select(devicesSelector);
    const newDevices = devices.map(device => {
      if (device.id === deviceId) return { ...device, favorite: true };
      return device;
    });
    yield put(actions.updateDevices({ devices: newDevices }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleFavoriteAllDevices(action) {
  try {
    const { deviceIdArray } = action.payload;
    yield Device.favoriteAllDevices(deviceIdArray);
    const devices = yield select(devicesSelector);
    const newDevices = devices.map(device => {
      if (deviceIdArray.includes(device.id)) return { ...device, favorite: true };
      return device;
    });
    yield put(actions.updateDevices({ devices: newDevices }));
  } catch (e) {
    console.log(e.message);
  }
}

function* watchGetDevices() {
  yield takeLatest(constants.GET_DEVICES, handleGetDevices);
}

function* watchDeleteDevice() {
  yield takeLatest(constants.DELETE_DEVICE, handleDeleteDevice);
}

function* watchDeleteAllDevices() {
  yield takeLatest(constants.DELETE_ALL_DEVICES, handleDeleteAllDevices);
}

function* watchFavoriteDevice() {
  yield takeLatest(constants.FAVORITE_DEVICE, handleFavoriteDevice);
}

function* watchFavoriteAllDevices() {
  yield takeLatest(constants.FAVORITE_ALL_DEVICES, handleFavoriteAllDevices);
}

export const deviceSaga = [
  fork(watchGetDevices),
  fork(watchDeleteDevice),
  fork(watchDeleteAllDevices),
  fork(watchFavoriteDevice),
  fork(watchFavoriteAllDevices),
];
