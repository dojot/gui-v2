// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { Template } from 'Services';

import { constants, actions } from '../modules/templates';
import { templatesSelector } from '../selectors/templatesSelector';

export function* handleGetTemplates(action) {
  try {
    yield put(actions.setLoadingTemplates(true));
    const { page, filter } = action.payload;
    const { getTemplates } = yield Template.getTemplatesList(page, filter);
    if (getTemplates) yield put(actions.updateTemplates(getTemplates));
  } catch (e) {
    yield put(actions.updateTemplates({ templates: [] }));
  } finally {
    yield put(actions.setLoadingTemplates(false));
  }
}

export function* handleDeleteTemplate(action) {
  try {
    const { templateId } = action.payload;
    yield Template.deleteTemplate(templateId);
    const templates = yield select(templatesSelector);
    const notDeletedTemplates = templates.filter(({ id }) => id !== templateId);
    yield put(actions.updateTemplates({ templates: notDeletedTemplates }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDeleteMultipleTemplates(action) {
  try {
    const { templateIdArray } = action.payload;
    yield Template.deleteMultipleTemplates(templateIdArray);
    const templates = yield select(templatesSelector);
    const notDeletedTemplates = templates.filter(({ id }) => !templateIdArray.includes(id));
    yield put(actions.updateTemplates({ templates: notDeletedTemplates }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleCreateTemplate(action) {
  try {
    const template = action.payload;
    yield Template.createTemplate(template);
    const templates = yield select(templatesSelector);
    yield put(actions.updateTemplates({ templates: [...templates, template] }));
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDuplicateTemplate(action) {
  try {
    const { templateId } = action.payload;
    const { duplicateTemplate } = yield Template.duplicateTemplate(templateId);
    const templates = yield select(templatesSelector);
    yield put(actions.updateTemplates({ templates: [...templates, duplicateTemplate] }));
  } catch (e) {
    console.log(e.message);
  }
}

function* watchGetTemplates() {
  yield takeLatest(constants.GET_TEMPLATES, handleGetTemplates);
}

function* watchDeleteTemplate() {
  yield takeLatest(constants.DELETE_TEMPLATE, handleDeleteTemplate);
}

function* watchDeleteMultipleTemplates() {
  yield takeLatest(constants.DELETE_ALL_TEMPLATES, handleDeleteMultipleTemplates);
}

function* watchCreateTemplate() {
  yield takeLatest(constants.CREATE_TEMPLATE, handleCreateTemplate);
}

function* watchDuplicateTemplate() {
  yield takeLatest(constants.DUPLICATE_TEMPLATE, handleDuplicateTemplate);
}

export const templateSaga = [
  fork(watchGetTemplates),
  fork(watchDeleteTemplate),
  fork(watchDeleteMultipleTemplates),
  fork(watchCreateTemplate),
  fork(watchDuplicateTemplate),
];
