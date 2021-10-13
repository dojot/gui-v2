// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { Device } from 'Services';

import { constants, actions } from '../modules/templates';
import { templatesSelector } from '../selectors/templatesSelector';

export function* handleGetTemplates(action) {
  try {
    yield put(actions.setLoadingTemplates(true));
    const { page, filter } = action.payload;
    const { getTemplates } = yield Device.getTemplatesList(page, filter);
    if (getTemplates) yield put(actions.updateTemplates(getTemplates));
  } catch (e) {
    yield put(actions.updateTemplates({ templates: [] }));
  } finally {
    yield put(actions.setLoadingTemplates(false));
  }
}

export function* handleDeleteDevice(action) {
  try {
    const { deviceId } = action.payload;
    yield Device.deleteDevice(deviceId);
    const templates = yield select(templatesSelector);
    const notDeletedTemplates = templates.filter(({ id }) => id !== deviceId);
    yield put(actions.updateTemplates({ templates: notDeletedTemplates }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDeleteMultipleTemplates(action) {
  try {
    const { deviceIdArray } = action.payload;
    yield Device.deleteMultipleTemplates(deviceIdArray);
    const templates = yield select(templatesSelector);
    const notDeletedTemplates = templates.filter(({ id }) => !deviceIdArray.includes(id));
    yield put(actions.updateTemplates({ templates: notDeletedTemplates }));
  } catch (e) {
    console.log(e.message);
  }
}

function* watchGetTemplates() {
  yield takeLatest(constants.GET_DEVICES, handleGetTemplates);
}

function* watchDeleteDevice() {
  yield takeLatest(constants.DELETE_DEVICE, handleDeleteDevice);
}

function* watchDeleteMultipleTemplates() {
  yield takeLatest(constants.DELETE_ALL_DEVICES, handleDeleteMultipleTemplates);
}

export const deviceSaga = [
  fork(watchGetTemplates),
  fork(watchDeleteDevice),
  fork(watchDeleteMultipleTemplates),
];
