import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { TemplateAttr } from 'Services';

import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { constants, actions } from '../modules/templateAttrs';
import { attrsSelector } from '../selectors/templateAttrsSelector';

export function* handleGetAttrs(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_ATTRS));
    const { templateId, page, filter } = action.payload;
    const { getAttrs } = yield TemplateAttr.getAttrsList({ templateId, page, filter });
    if (getAttrs) yield put(actions.updateAttrs(getAttrs));
  } catch (e) {
    yield put(actions.updateAttrs({ attrs: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getAttrs',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_ATTRS));
  }
}

export function* handleDeleteAttr(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_ATTR));
    const { templateId, attrId } = action.payload;
    yield TemplateAttr.deleteAttr(templateId, attrId);
    const attrs = yield select(attrsSelector);
    const notDeletedAttrs = attrs.filter(({ id }) => id !== attrId);
    yield put(actions.updateAttrs({ attrs: notDeletedAttrs }));
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
    yield put(loadingActions.addLoading(constants.DELETE_ALL_ATTRS));
    const { templateId, attrIdArray } = action.payload;
    yield TemplateAttr.deleteMultipleAttrs(templateId, attrIdArray);
    const attrs = yield select(attrsSelector);
    const notDeletedAttrs = attrs.filter(({ id }) => !attrIdArray.includes(id));
    yield put(actions.updateAttrs({ attrs: notDeletedAttrs }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleAttrs' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleAttrs',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_ALL_ATTRS));
  }
}

export function* handleCreateAttr(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_ATTR));
    const { templateId, attr } = action.payload;
    const { createAttr } = yield TemplateAttr.createAttr(templateId, attr);
    const attrs = yield select(attrsSelector);
    yield put(actions.updateAttrs({ attrs: [...attrs, createAttr] }));
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
    const { templateId, attr } = action.payload;
    const { editAttr } = yield TemplateAttr.editAttr(templateId, attr);
    const attrs = yield select(attrsSelector);
    const attrIndex = attrs.findIndex(({ id }) => id === attr.id);
    const attrsClone = [...attrs];
    attrsClone.splice(attrIndex, 1, editAttr);
    yield put(actions.updateAttrs({ attrs: attrsClone }));
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

function* watchGetAttrs() {
  yield takeLatest(constants.GET_ATTRS, handleGetAttrs);
}

function* watchDeleteAttr() {
  yield takeLatest(constants.DELETE_ATTR, handleDeleteAttr);
}

function* watchDeleteMultipleAttrs() {
  yield takeLatest(constants.DELETE_ALL_ATTRS, handleDeleteMultipleAttrs);
}

function* watchCreateAttr() {
  yield takeLatest(constants.CREATE_ATTR, handleCreateAttr);
}

function* watchEditAttr() {
  yield takeLatest(constants.EDIT_ATTR, handleEditAttr);
}

export const templateAttrsSaga = [
  fork(watchGetAttrs),
  fork(watchDeleteAttr),
  fork(watchDeleteMultipleAttrs),
  fork(watchCreateAttr),
  fork(watchEditAttr),
];
