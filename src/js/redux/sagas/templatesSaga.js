import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Template } from 'Services';

import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { constants, actions } from '../modules/templates';
import { paginationControlSelector } from '../selectors/templatesSelector';

export function* getCurrentTemplatesPageAgain() {
  const pagination = yield select(paginationControlSelector);
  yield put(
    actions.getTemplates({
      page: {
        number: pagination.currentPage,
        size: pagination.itemsPerPage,
      },
    }),
  );
}

export function* handleGetTemplates(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_TEMPLATES));
    const { page, filter } = action.payload;
    const { getTemplates } = yield call(Template.getTemplatesList, page, filter);
    if (getTemplates) {
      yield put(
        actions.updateTemplates({
          templates: getTemplates.templates,
          paginationControl: {
            currentPage: getTemplates.currentPage,
            totalPages: getTemplates.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
    }
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

export function* handleGetTemplateById(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_TEMPLATE_BY_ID));
    const { templateId } = action.payload;
    const { getTemplateById } = yield call(Template.getTemplateById, templateId);
    if (getTemplateById) yield put(actions.updateTemplates({ templateData: getTemplateById }));
  } catch (e) {
    yield put(actions.updateTemplates({ templateData: null }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getTemplateById',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_TEMPLATE_BY_ID));
  }
}

export function* handleDeleteTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_TEMPLATE));
    const { templateId } = action.payload;
    yield call(Template.deleteTemplates, [templateId]);
    yield call(getCurrentTemplatesPageAgain);
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
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_TEMPLATES));
    const { templateIds } = action.payload;
    yield call(Template.deleteTemplates, templateIds);
    yield call(getCurrentTemplatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleTemplates' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleTemplates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_TEMPLATES));
  }
}

export function* handleCreateTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_TEMPLATE));
    const { label, attrs, successCallback } = action.payload;
    yield call(Template.createTemplate, { label, attrs });
    if (successCallback) yield call(successCallback);
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

export function* handleEditTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.EDIT_TEMPLATE));
    const { id, label, attrs, successCallback } = action.payload;
    yield call(Template.editTemplate, { id, label, attrs });
    if (successCallback) yield call(successCallback);
    yield put(successActions.showSuccessToast({ i18nMessage: 'editTemplate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'editTemplate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.EDIT_TEMPLATE));
  }
}

export function* handleDuplicateTemplate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DUPLICATE_TEMPLATE));
    const { templateId } = action.payload;
    yield call(Template.duplicateTemplate, templateId);
    yield call(getCurrentTemplatesPageAgain);
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

export function* watchGetTemplates() {
  yield takeLatest(constants.GET_TEMPLATES, handleGetTemplates);
}

export function* watchGetTemplateById() {
  yield takeLatest(constants.GET_TEMPLATE_BY_ID, handleGetTemplateById);
}

export function* watchDeleteTemplate() {
  yield takeLatest(constants.DELETE_TEMPLATE, handleDeleteTemplate);
}

export function* watchDeleteMultipleTemplates() {
  yield takeLatest(constants.DELETE_MULTIPLE_TEMPLATES, handleDeleteMultipleTemplates);
}

export function* watchCreateTemplate() {
  yield takeLatest(constants.CREATE_TEMPLATE, handleCreateTemplate);
}

export function* watchEditTemplate() {
  yield takeLatest(constants.EDIT_TEMPLATE, handleEditTemplate);
}

export function* watchDuplicateTemplate() {
  yield takeLatest(constants.DUPLICATE_TEMPLATE, handleDuplicateTemplate);
}

export const templateSaga = [
  fork(watchGetTemplates),
  fork(watchGetTemplateById),
  fork(watchDeleteTemplate),
  fork(watchDeleteMultipleTemplates),
  fork(watchCreateTemplate),
  fork(watchEditTemplate),
  fork(watchDuplicateTemplate),
];
