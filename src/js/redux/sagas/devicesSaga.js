import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Device } from 'Services';
import { getUserInformation } from 'Utils';

import { constants, actions } from '../modules/devices';
import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { paginationControlSelector } from '../selectors/devicesSelector';

export function* getCurrentDevicesPageAgain() {
  const pagination = yield select(paginationControlSelector);
  yield put(
    actions.getDevices({
      page: {
        number: pagination.currentPage,
        size: pagination.itemsPerPage,
      },
    }),
  );
}

export function* handleGetDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_DEVICES));
    const { page, filter } = action.payload;
    const { getDevices } = yield call(Device.getDevicesList, page, filter);
    if (getDevices)
      yield put(
        actions.updateDevices({
          devices: getDevices.devices,
          paginationControl: {
            currentPage: getDevices.currentPage,
            totalPages: getDevices.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
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

export function* handleGetFavoriteDevicesList() {
  try {
    yield put(loadingActions.addLoading(constants.GET_FAVORITE_DEVICES));
    const { userName, tenant } = yield call(getUserInformation);
    const { getFavoriteDevicesList } = yield call(Device.getFavoriteDevicesList, userName, tenant);
    if (getFavoriteDevicesList) {
      yield put(actions.updateDevices({ favoriteDevices: getFavoriteDevicesList }));
    }
  } catch (e) {
    yield put(actions.updateDevices({ favoriteDevices: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getFavoriteDevices',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_DEVICE_BY_ID));
  }
}

export function* handleGetDeviceById(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_DEVICE_BY_ID));
    const { deviceId } = action.payload;
    const { getDeviceById } = yield call(Device.getDeviceById, deviceId);
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
    const { userName, tenant } = yield call(getUserInformation);
    const { deviceId, successCallback, shouldGetCurrentPageAgain } = action.payload;
    yield call(Device.deleteDevices, [deviceId], userName, tenant);
    if (successCallback) yield call(successCallback);
    if (shouldGetCurrentPageAgain) yield call(getCurrentDevicesPageAgain);
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
    const { userName, tenant } = yield call(getUserInformation);
    const { deviceIdArray } = action.payload;
    yield call(Device.deleteDevices, deviceIdArray, userName, tenant);
    yield call(getCurrentDevicesPageAgain);
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
    const { userName, tenant } = yield call(getUserInformation);
    const { deviceId } = action.payload;
    const { favoriteDevices } = yield call(Device.favoriteDevices, {
      deviceIds: [deviceId],
      userName,
      tenant,
    });

    if (favoriteDevices)
      yield put(successActions.showSuccessToast({ i18nMessage: 'favoriteDevice' }));

    if (!favoriteDevices)
      yield put(successActions.showSuccessToast({ i18nMessage: 'removedFavoriteDevice' }));

    yield call(getCurrentDevicesPageAgain);
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
    const { userName, tenant } = yield call(getUserInformation);
    const { deviceIdArray } = action.payload;
    yield call(Device.favoriteDevices, { deviceIds: deviceIdArray, userName, tenant });
    yield call(getCurrentDevicesPageAgain);
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
    const { id, label, templates, attrs, successCallback } = action.payload;
    yield call(Device.editDevice, { id, label, templates, attrs });
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
    const { label, templates, attrs, fingerprint, successCallback } = action.payload;
    yield call(Device.createDevice, { label, templates, attrs, fingerprint });
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

export function* watchGetDevices() {
  yield takeLatest(constants.GET_DEVICES, handleGetDevices);
}

export function* watchGetFavoriteDevices() {
  yield takeLatest(constants.GET_FAVORITE_DEVICES, handleGetFavoriteDevicesList);
}

export function* watchGetDeviceById() {
  yield takeLatest(constants.GET_DEVICE_BY_ID, handleGetDeviceById);
}

export function* watchDeleteDevice() {
  yield takeLatest(constants.DELETE_DEVICE, handleDeleteDevice);
}

export function* watchDeleteMultipleDevices() {
  yield takeLatest(constants.DELETE_MULTIPLE_DEVICES, handleDeleteMultipleDevices);
}

export function* watchFavoriteDevice() {
  yield takeLatest(constants.FAVORITE_DEVICE, handleFavoriteDevice);
}

export function* watchFavoriteMultipleDevices() {
  yield takeLatest(constants.FAVORITE_MULTIPLE_DEVICES, handleFavoriteMultipleDevices);
}

export function* watchEditDevice() {
  yield takeLatest(constants.EDIT_DEVICE, handleEditDevice);
}

export function* watchCreateDevice() {
  yield takeLatest(constants.CREATE_DEVICE, handleCreateDevice);
}

export const deviceSaga = [
  fork(watchGetDevices),
  fork(watchGetFavoriteDevices),
  fork(watchGetDeviceById),
  fork(watchDeleteDevice),
  fork(watchDeleteMultipleDevices),
  fork(watchFavoriteDevice),
  fork(watchFavoriteMultipleDevices),
  fork(watchEditDevice),
  fork(watchCreateDevice),
];
