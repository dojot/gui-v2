// TODO: Handle the exception more appropriately
import { put, fork, takeLatest } from 'redux-saga/effects';
import { Device } from 'Services';

import { constants, actions } from '../modules/devices';

export function* handleGetDevices(action) {
  try {
    yield put(actions.setLoadingDevices(true));

    const { page, filter } = action.payload;
    const { getDevices } = yield Device.getDevicesList(page, filter);

    if (getDevices) {
      yield put(actions.updateDevices(getDevices));
    } else {
      yield put(
        actions.updateDevices({
          devices: [],
          totalPages: 0,
          currentPage: 1,
        }),
      );
    }
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
    yield put(actions.updateDevices({ devices: [] }));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
  }
}

export function* handleDeleteAllDevices(action) {
  try {
    const { deviceIdArray } = action.payload;
    yield Device.deleteAllDevices(deviceIdArray);
    yield put(actions.updateDevices({ devices: [] }));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
  }
}

export function* handleFavoriteDevice(action) {
  try {
    const { deviceId } = action.payload;
    yield Device.favoriteDevice(deviceId);
    yield put(actions.updateDevices({ devices: [] }));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
  }
}

export function* handleFavoriteAllDevices(action) {
  try {
    const { deviceIdArray } = action.payload;
    yield Device.favoriteAllDevices(deviceIdArray);
    yield put(actions.updateDevices({ devices: [] }));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
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
