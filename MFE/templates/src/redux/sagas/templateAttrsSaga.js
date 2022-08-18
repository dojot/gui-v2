import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { TemplateAttr } from 'Services';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';
import { getErrorTranslation } from 'sharedComponents/Utils';

import { actions as loadingActions } from '../modules/loading';
import { constants } from '../modules/templateAttrs';

export function* handleDeleteAttr(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_ATTR));
    const { templateId, attrId, successCallback } = action.payload;
    yield call(TemplateAttr.deleteTemplateAttrs, templateId, [attrId]);
    if (successCallback) yield call(successCallback);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteAttr',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteAttr',
      type: 'error',
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteMultipleAttrs',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteMultipleAttrs',
      type: 'error',
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'createAttr',
      type: 'success',
    });
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'createAttr', {
      attrs_template_id_type_label_key: 'attrUnique',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'editAttr',
      type: 'success',
    });
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'editAttr', {
      attrs_template_id_type_label_key: 'attrUnique',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
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
