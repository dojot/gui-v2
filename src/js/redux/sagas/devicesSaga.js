import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { Device } from 'Services';
import { getUserInformation } from 'Utils';

import { constants, actions } from '../modules/devices';
import { actions as errorActions } from '../modules/error';
import { actions as loadingActions } from '../modules/loading';
import { devicesSelector } from '../selectors/devicesSelector';

export function* handleGetDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_DEVICES));
    const { page, filter } = action.payload;
    const { getDevices } = yield Device.getDevicesList(page, filter);
    if (getDevices) yield put(actions.updateDevices(getDevices));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
    yield put(errorActions.addError({ message: e.message }));
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_DEVICES));
  }
}

export function* handleDeleteDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_DEVICE));
    const { deviceId } = action.payload;
    yield Device.deleteDevice(deviceId);
    const devices = yield select(devicesSelector);
    const notDeletedDevices = devices.filter(({ id }) => id !== deviceId);
    yield put(actions.updateDevices({ devices: notDeletedDevices }));
  } catch (e) {
    yield put(errorActions.addError({ message: e.message }));
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_DEVICE));
  }
}

export function* handleDeleteMultipleDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_ALL_DEVICES));
    const { deviceIdArray } = action.payload;
    yield Device.deleteMultipleDevices(deviceIdArray);
    const devices = yield select(devicesSelector);
    const notDeletedDevices = devices.filter(({ id }) => !deviceIdArray.includes(id));
    yield put(actions.updateDevices({ devices: notDeletedDevices }));
  } catch (e) {
    yield put(errorActions.addError({ message: e.message }));
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_ALL_DEVICES));
  }
}

export function* handleFavoriteDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.FAVORITE_DEVICE));
    const { deviceId } = action.payload;
    const { userName, tenant } = getUserInformation();
    yield Device.favoriteDevice({ deviceId, user: userName, tenant });
    const devices = yield select(devicesSelector);
    const newDevices = devices.map(device => {
      if (device.id === deviceId) return { ...device, favorite: !device.favorite };
      return device;
    });
    yield put(actions.updateDevices({ devices: newDevices }));
  } catch (e) {
    yield put(errorActions.addError({ message: e.message }));
  } finally {
    yield put(loadingActions.removeLoading(constants.FAVORITE_DEVICE));
  }
}

export function* handleFavoriteMultipleDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.FAVORITE_MULTIPLE_DEVICES));
    const { deviceIdArray } = action.payload;
    const { userName, tenant } = getUserInformation();
    yield Device.favoriteMultipleDevices({ deviceIdArray, user: userName, tenant });
    const devices = yield select(devicesSelector);
    const newDevices = devices.map(device => {
      if (deviceIdArray.includes(device.id)) return { ...device, favorite: !device.favorite };
      return device;
    });
    yield put(actions.updateDevices({ devices: newDevices }));
  } catch (e) {
    yield put(errorActions.addError({ message: e.message }));
  } finally {
    yield put(loadingActions.removeLoading(constants.FAVORITE_MULTIPLE_DEVICES));
  }
}

export function* handleEditDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.EDIT_DEVICE));
    const { deviceId, label, templates, attrs } = action.payload;
    const { editDevice } = yield Device.editDevice({
      deviceId,
      label,
      templates,
      attrs,
    });
    const devices = yield select(devicesSelector);
    const newDevices = devices.map(device => {
      if (deviceId === device.id) return { ...device, ...editDevice };
      return device;
    });
    yield put(actions.updateDevices({ devices: newDevices }));
  } catch (e) {
    yield put(errorActions.addError({ message: e.message }));
  } finally {
    yield put(loadingActions.removeLoading(constants.EDIT_DEVICE));
  }
}

function* watchGetDevices() {
  yield takeLatest(constants.GET_DEVICES, handleGetDevices);
}

function* watchDeleteDevice() {
  yield takeLatest(constants.DELETE_DEVICE, handleDeleteDevice);
}

function* watchDeleteMultipleDevices() {
  yield takeLatest(constants.DELETE_ALL_DEVICES, handleDeleteMultipleDevices);
}

function* watchFavoriteDevice() {
  yield takeLatest(constants.FAVORITE_DEVICE, handleFavoriteDevice);
}

function* watchFavoriteMultipleDevices() {
  yield takeLatest(constants.FAVORITE_MULTIPLE_DEVICES, handleFavoriteMultipleDevices);
}

function* watchEditDevice() {
  yield takeLatest(constants.EDIT_DEVICE, handleEditDevice);
}

export const deviceSaga = [
  fork(watchGetDevices),
  fork(watchDeleteDevice),
  fork(watchDeleteMultipleDevices),
  fork(watchFavoriteDevice),
  fork(watchFavoriteMultipleDevices),
  fork(watchEditDevice),
];
