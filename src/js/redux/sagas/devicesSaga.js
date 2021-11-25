import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Device } from 'Services';
import { getUserInformation } from 'Utils';

import { constants, actions } from '../modules/devices';
import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { devicesSelector } from '../selectors/devicesSelector';

export function* handleGetDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_DEVICES));
    const { page, filter } = action.payload;
    const { getDevices } = yield Device.getDevicesList(page, filter);
    if (getDevices) yield put(actions.updateDevices(getDevices));
  } catch (e) {
    yield put(actions.updateDevices({ devices: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getDevices',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_DEVICES));
  }
}

export function* handleGetDeviceById(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_DEVICE_BY_ID));
    const { deviceId } = action.payload;
    const { getDeviceById } = yield Device.getDeviceById(deviceId);
    if (getDeviceById) yield put(actions.updateDevices({ deviceData: getDeviceById }));
  } catch (e) {
    yield put(actions.updateDevices({ deviceData: null }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getDeviceById',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_DEVICE_BY_ID));
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
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteDevice' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteDevice',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_DEVICE));
  }
}

export function* handleDeleteMultipleDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_DEVICES));
    const { deviceIdArray } = action.payload;
    yield Device.deleteMultipleDevices(deviceIdArray);
    const devices = yield select(devicesSelector);
    const notDeletedDevices = devices.filter(({ id }) => !deviceIdArray.includes(id));
    yield put(actions.updateDevices({ devices: notDeletedDevices }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleDevices' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleDevices',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_DEVICES));
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
    yield put(successActions.showSuccessToast({ i18nMessage: 'favoriteDevice' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'favoriteDevice',
      }),
    );
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
      if (deviceIdArray.includes(device.id)) {
        return { ...device, favorite: !device.favorite };
      }
      return device;
    });
    yield put(actions.updateDevices({ devices: newDevices }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'favoriteMultipleDevices' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'favoriteMultipleDevices',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.FAVORITE_MULTIPLE_DEVICES));
  }
}

export function* handleEditDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.EDIT_DEVICE));
    const { deviceId, label, templates, attrs, successCallback } = action.payload;
    yield Device.editDevice({
      deviceId,
      label,
      templates,
      attrs,
    });
    yield put(successActions.showSuccessToast({ i18nMessage: 'editDevice' }));
    if (successCallback) yield call(successCallback);
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'editDevice',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.EDIT_DEVICE));
  }
}

export function* handleCreateDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_DEVICE));
    const { label, templates, attrs, certificate, successCallback } = action.payload;
    yield Device.createDevice({ label, templates, attrs, certificate });
    yield put(successActions.showSuccessToast({ i18nMessage: 'createDevice' }));
    if (successCallback) yield call(successCallback);
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'createDevice',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_DEVICE));
  }
}

function* watchGetDevices() {
  yield takeLatest(constants.GET_DEVICES, handleGetDevices);
}

function* watchGetDeviceById() {
  yield takeLatest(constants.GET_DEVICE_BY_ID, handleGetDeviceById);
}

function* watchDeleteDevice() {
  yield takeLatest(constants.DELETE_DEVICE, handleDeleteDevice);
}

function* watchDeleteMultipleDevices() {
  yield takeLatest(constants.DELETE_MULTIPLE_DEVICES, handleDeleteMultipleDevices);
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

function* watchCreateDevice() {
  yield takeLatest(constants.CREATE_DEVICE, handleCreateDevice);
}

export const deviceSaga = [
  fork(watchGetDevices),
  fork(watchGetDeviceById),
  fork(watchDeleteDevice),
  fork(watchDeleteMultipleDevices),
  fork(watchFavoriteDevice),
  fork(watchFavoriteMultipleDevices),
  fork(watchEditDevice),
  fork(watchCreateDevice),
];
