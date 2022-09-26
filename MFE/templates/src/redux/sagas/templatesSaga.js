import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Template } from 'Services';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';
import { getErrorTranslation } from 'sharedComponents/Utils';

import { actions as loadingActions } from '../modules/loading';
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
    const { page, filter, sortBy } = action.payload;
    const { getTemplates } = yield call(Template.getTemplatesList, page, filter, sortBy);
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getTemplates',
      type: 'error',
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getTemplateById',
      type: 'error',
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteTemplate',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteTemplate',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_TEMPLATE));
  }
}

export function* handleDeleteMultipleTemplates(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_TEMPLATES));
    const { templateIds, failCallback } = action.payload;
    const {
      deleteMultipleTemplates: { notDeletedTemplates, deletedTemplates },
    } = yield call(Template.deleteMultipleTemplates, templateIds);
    if (!!notDeletedTemplates.length) failCallback(notDeletedTemplates, deletedTemplates);
    yield call(getCurrentTemplatesPageAgain);
    if (!notDeletedTemplates.length)
      dispatchEvent(EVENT.GLOBAL_TOAST, {
        duration: 15000,
        i18nMessage: 'deleteMultipleTemplates',
        type: 'success',
      });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteMultipleTemplates',
      type: 'error',
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'createTemplate',
      type: 'success',
    });
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'createTemplate', {
      templates_label_key: 'templateUniqueLabel',
      attrs_template_id_type_label_key: 'attrUnique',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'editTemplate',
      type: 'success',
    });
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'editTemplate', {
      templates_label_key: 'templateUniqueLabel',
      attrs_template_id_type_label_key: 'attrUnique',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
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
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'duplicateTemplate',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'duplicateTemplate',
      type: 'error',
    });
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
