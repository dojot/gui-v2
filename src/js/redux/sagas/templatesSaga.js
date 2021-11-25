// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { Template } from 'Services';

import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { constants, actions } from '../modules/templates';
import { templatesSelector } from '../selectors/templatesSelector';

export function* handleGetTemplates(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_TEMPLATES));
    const { page, filter } = action.payload;
    const { getTemplates } = yield Template.getTemplatesList(page, filter);
    if (getTemplates) yield put(actions.updateTemplates(getTemplates));
  } catch (e) {
    yield put(actions.updateTemplates({ templates: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getTemplates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_TEMPLATES));
  }
}

export function* handleDeleteTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_TEMPLATE));
    const { templateId } = action.payload;
    yield Template.deleteTemplate(templateId);
    const templates = yield select(templatesSelector);
    const notDeletedTemplates = templates.filter(({ id }) => id !== templateId);
    yield put(actions.updateTemplates({ templates: notDeletedTemplates }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteTemplate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteTemplate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_TEMPLATE));
  }
}

export function* handleDeleteMultipleTemplates(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_ALL_TEMPLATES));
    const { templateIdArray } = action.payload;
    yield Template.deleteMultipleTemplates(templateIdArray);
    const templates = yield select(templatesSelector);
    const notDeletedTemplates = templates.filter(({ id }) => !templateIdArray.includes(id));
    yield put(actions.updateTemplates({ templates: notDeletedTemplates }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleTemplates' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleTemplates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_ALL_TEMPLATES));
  }
}

export function* handleCreateTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_TEMPLATE));
    const template = action.payload;
    yield Template.createTemplate(template);
    const templates = yield select(templatesSelector);
    yield put(actions.updateTemplates({ templates: [...templates, template] }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'createTemplate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'createTemplate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_TEMPLATE));
  }
}

export function* handleDuplicateTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DUPLICATE_TEMPLATE));
    const { templateId } = action.payload;
    const { duplicateTemplate } = yield Template.duplicateTemplate(templateId);
    const templates = yield select(templatesSelector);
    yield put(actions.updateTemplates({ templates: [...templates, duplicateTemplate] }));
    yield put(successActions.showSuccessToast({ i18nMessage: 'duplicateTemplate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'duplicateTemplate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DUPLICATE_TEMPLATE));
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
