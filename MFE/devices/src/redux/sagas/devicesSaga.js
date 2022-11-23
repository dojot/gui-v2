import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Device } from '../../adapters/services';
import { getUserInformation, getErrorTranslation, toBase64 } from 'sharedComponents/Utils';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';

import { constants, actions } from '../modules/devices';
import { actions as loadingActions } from '../modules/loading';
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
    const { page, filter, sortBy } = action.payload;
    const { getDevices } = yield call(Device.getDevicesList, page, filter, sortBy);
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getDevices',
      type: 'error',
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getFavoriteDevices',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_FAVORITE_DEVICES));
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getDeviceById',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_DEVICE_BY_ID));
  }
}

export function* handleDeleteDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_DEVICE));
    const { deviceId, successCallback, shouldGetCurrentPageAgain } = action.payload;
    const { userName, tenant } = yield call(getUserInformation);
    yield call(Device.deleteDevices, [deviceId], userName, tenant);
    if (successCallback) yield call(successCallback);
    if (shouldGetCurrentPageAgain) yield call(getCurrentDevicesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteDevice',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteDevice',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_DEVICE));
  }
}

export function* handleDeleteMultipleDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_DEVICES));
    const { deviceIdArray } = action.payload;
    const { userName, tenant } = yield call(getUserInformation);
    yield call(Device.deleteDevices, deviceIdArray, userName, tenant);
    yield call(getCurrentDevicesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteMultipleDevices',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteMultipleDevices',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_DEVICES));
  }
}

export function* handleEditDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.EDIT_DEVICE));
    const { id, label, templates, attrs, disabled, successCallback } = action.payload;
    yield call(Device.editDevice, { id, label, templates, attrs, disabled });
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'editDevice',
      type: 'success',
    });
    if (successCallback) yield call(successCallback);
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'editDevice', {
      devices_label_key: 'deviceUniqueLabel',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.EDIT_DEVICE));
  }
}

export function* handleCreateDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_DEVICE));
    const { label, templates, attrs, fingerprint, disabled, successCallback } = action.payload;
    yield call(Device.createDevice, {
      label,
      templates,
      attrs,
      fingerprint,
      disabled,
    });
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'createDevice',
      type: 'success',
    });
    if (successCallback) yield call(successCallback);
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'createDevice', {
      devices_label_key: 'deviceUniqueLabel',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_DEVICE));
  }
}

export function* handleCreateMultipleDevices(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_MULTIPLE_DEVICES));
    const { devicesPrefix, quantity, initialSuffixNumber, templates, attrs, successCallback } =
      action.payload;

    const { createMultipleDevices } = yield call(Device.createMultipleDevices, {
      devicesPrefix,
      quantity,
      initialSuffixNumber,
      templates,
      attrs,
    });

    if (createMultipleDevices.devicesWithError) yield call(successCallback);
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'createDevice', {
      devices_label_key: 'deviceUniqueLabel',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_MULTIPLE_DEVICES));
  }
}

export function* handleCreateDevicesCSV(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_DEVICES_CSV));
    const { csvFile, successCallback } = action.payload;

    const csvFileToBase64 = yield call(toBase64, csvFile);

    const {
      createDevicesCSV: { createdDevices, notCreatedDevices },
    } = yield call(Device.createDevicesCSV, {
      csvFile: csvFileToBase64,
    });

    if (successCallback) successCallback(createdDevices, notCreatedDevices);
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'createDevice', {
      devices_label_key: 'deviceUniqueLabel',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_DEVICES_CSV));
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

    if (favoriteDevices) {
      dispatchEvent(EVENT.GLOBAL_TOAST, {
        duration: 15000,
        i18nMessage: 'favoriteDevice',
        type: 'success',
      });
    } else {
      dispatchEvent(EVENT.GLOBAL_TOAST, {
        duration: 15000,
        i18nMessage: 'removedFavoriteDevice',
        type: 'success',
      });
    }
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'favoriteDevice',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.FAVORITE_DEVICE));
  }
}

export function* handleAssociateDevicesInBatch(action) {
  try {
    yield put(loadingActions.addLoading(constants.ASSOCIATE_DEVICES_IN_BATCH));
    const { deviceIdArray } = action.payload;
    const {
      associateDevicesInBatch: {
        associatedDevices,
        devicesWithOtherCertificates,
        notAssociatedDevices,
      },
    } = yield call(Device.associateDevicesInBatch, {
      deviceIdArray,
    });

    if (associatedDevices)
      yield put(actions.updateDevices({ associatedDevices: associatedDevices }));
    if (devicesWithOtherCertificates)
      yield put(
        actions.updateDevices({ devicesWithOtherCertificates: devicesWithOtherCertificates }),
      );
    if (notAssociatedDevices)
      yield put(actions.updateDevices({ notAssociatedDevices: notAssociatedDevices }));
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'favoriteDevice',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.ASSOCIATE_DEVICES_IN_BATCH));
  }
}

export function* handleActuate(action) {
  try {
    yield put(loadingActions.addLoading(constants.ACTUATE));
    const { deviceId, labels, values, successCallback } = action.payload;

    yield call(Device.actuate, {
      deviceId,
      labels,
      values,
    });

    if (successCallback) yield call(successCallback);

    yield put(actions.updateActuatorData({ labels, values }));

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'actuate',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      type: 'error',
      duration: 15000,
      message: e.message,
      i18nMessage: 'actuate',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.ACTUATE));
  }
}

export function* watchGetDevices() {
  yield takeLatest(constants.GET_DEVICES, handleGetDevices);
}

export function* watchGetFavoriteDevicesList() {
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

export function* watchEditDevice() {
  yield takeLatest(constants.EDIT_DEVICE, handleEditDevice);
}

export function* watchCreateDevice() {
  yield takeLatest(constants.CREATE_DEVICE, handleCreateDevice);
}

export function* watchCreateMultipleDevices() {
  yield takeLatest(constants.CREATE_MULTIPLE_DEVICES, handleCreateMultipleDevices);
}

export function* watchAssociateDevicesInBatch() {
  yield takeLatest(constants.ASSOCIATE_DEVICES_IN_BATCH, handleAssociateDevicesInBatch);
}

export function* watchCreateDevicesCSV() {
  yield takeLatest(constants.CREATE_DEVICES_CSV, handleCreateDevicesCSV);
}

export function* watchActuate() {
  yield takeLatest(constants.ACTUATE, handleActuate);
}

export const deviceSaga = [
  fork(watchGetDevices),
  fork(watchGetFavoriteDevicesList),
  fork(watchGetDeviceById),
  fork(watchDeleteDevice),
  fork(watchDeleteMultipleDevices),
  fork(watchFavoriteDevice),
  fork(watchEditDevice),
  fork(watchCreateDevice),
  fork(watchCreateMultipleDevices),
  fork(watchAssociateDevicesInBatch),
  fork(watchCreateDevicesCSV),
  fork(watchActuate),
];
