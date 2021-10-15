// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { TemplateAttr } from 'Services';

import { constants, actions } from '../modules/templateAttrs';
import { attrsSelector } from '../selectors/templateAttrsSelector';

export function* handleGetAttrs(action) {
  try {
    yield put(actions.setLoadingAttrs(true));
    const { templateId, page, filter } = action.payload;
    const { getAttrs } = yield TemplateAttr.getAttrsList({ templateId, page, filter });
    if (getAttrs) yield put(actions.updateAttrs(getAttrs));
  } catch (e) {
    yield put(actions.updateAttrs({ attrs: [] }));
  } finally {
    yield put(actions.setLoadingAttrs(false));
  }
}

export function* handleDeleteAttr(action) {
  try {
    const { templateId, attrId } = action.payload;
    yield TemplateAttr.deleteAttr(templateId, attrId);
    const attrs = yield select(attrsSelector);
    const notDeletedAttrs = attrs.filter(({ id }) => id !== attrId);
    yield put(actions.updateAttrs({ attrs: notDeletedAttrs }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDeleteMultipleAttrs(action) {
  try {
    const { templateId, attrIdArray } = action.payload;
    yield TemplateAttr.deleteMultipleAttrs(templateId, attrIdArray);
    const attrs = yield select(attrsSelector);
    const notDeletedAttrs = attrs.filter(({ id }) => !attrIdArray.includes(id));
    yield put(actions.updateAttrs({ attrs: notDeletedAttrs }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleCreateAttr(action) {
  try {
    const { templateId, ...attrData } = action.payload;
    const { createAttr } = yield TemplateAttr.createAttr(templateId, attrData);
    const attrs = yield select(attrsSelector);
    yield put(actions.updateAttrs({ attrs: [...attrs, createAttr] }));
  } catch (e) {
    console.log(e.message);
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

export const templateAttrsSaga = [
  fork(watchGetAttrs),
  fork(watchDeleteAttr),
  fork(watchDeleteMultipleAttrs),
  fork(watchCreateAttr),
];
