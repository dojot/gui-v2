import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { TemplateAttr } from 'Services';

import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { constants } from '../modules/templateAttrs';

export function* handleDeleteAttr(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_ATTR));
    const { templateId, attrId, successCallback } = action.payload;
    yield call(TemplateAttr.deleteTemplateAttrs, templateId, [attrId]);
    if (successCallback) yield call(successCallback);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteAttr' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteAttr',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_ATTR));
  }
}

export function* handleDeleteMultipleAttrs(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_ATTRS));
    const { templateId, attrIds, successCallback } = action.payload;
    yield call(TemplateAttr.deleteTemplateAttrs, templateId, attrIds);
    if (successCallback) yield call(successCallback);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleAttrs' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleAttrs',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_ATTRS));
  }
}

export function* handleCreateAttr(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_ATTR));
    const { templateId, attr, successCallback } = action.payload;
    yield call(TemplateAttr.createTemplateAttr, templateId, attr);
    if (successCallback) yield call(successCallback);
    yield put(successActions.showSuccessToast({ i18nMessage: 'createAttr' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'createAttr',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_ATTR));
  }
}

export function* handleEditAttr(action) {
  try {
    yield put(loadingActions.addLoading(constants.EDIT_ATTR));
    const { templateId, attrId, attr, successCallback } = action.payload;
    yield call(TemplateAttr.editTemplateAttr, templateId, attrId, attr);
    if (successCallback) yield call(successCallback);
    yield put(successActions.showSuccessToast({ i18nMessage: 'editAttr' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'editAttr',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.EDIT_ATTR));
  }
}

export function* watchDeleteAttr() {
  yield takeLatest(constants.DELETE_ATTR, handleDeleteAttr);
}

export function* watchDeleteMultipleAttrs() {
  yield takeLatest(constants.DELETE_MULTIPLE_ATTRS, handleDeleteMultipleAttrs);
}

export function* watchCreateAttr() {
  yield takeLatest(constants.CREATE_ATTR, handleCreateAttr);
}

export function* watchEditAttr() {
  yield takeLatest(constants.EDIT_ATTR, handleEditAttr);
}

export const templateAttrsSaga = [
  fork(watchDeleteAttr),
  fork(watchDeleteMultipleAttrs),
  fork(watchCreateAttr),
  fork(watchEditAttr),
];
