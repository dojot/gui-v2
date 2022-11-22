import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { Template } from 'Services';

import { actions as loadingActions } from '../../modules/loading';
import { constants, actions } from '../../modules/templates';
import { paginationControlSelector } from '../../selectors/templatesSelector';
import {
  getCurrentTemplatesPageAgain,
  handleCreateTemplate,
  handleDeleteMultipleTemplates,
  handleDeleteTemplate,
  handleDuplicateTemplate,
  handleEditTemplate,
  handleGetTemplateById,
  handleGetTemplates,
  templateSaga,
  watchCreateTemplate,
  watchDeleteMultipleTemplates,
  watchDeleteTemplate,
  watchDuplicateTemplate,
  watchEditTemplate,
  watchGetTemplateById,
  watchGetTemplates,
} from '../templatesSaga';

jest.mock('sharedComponents/Utils', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  getErrorTranslation: jest.fn(),
}));

jest.mock('sharedComponents/Hooks', () => ({
  __esModule: true,
  dispatchEvent: jest.fn(),
}));

jest.mock('sharedComponents/Constants', () => ({
  __esModule: true,
  EVENT: 'mocked',
}));

describe('templatesSaga', () => {
  beforeAll(() => {
    // Using fake timers because errorActions.addError uses Date.now()
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.now());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeTemplate = {
    id: '1',
    label: 'Template 1',
    attrs: [],
  };

  it('should get the current page of templates again', async () => {
    const selectPagination = matchers.select(paginationControlSelector);

    const pagination = {
      currentPage: 1,
      size: 10,
    };

    return expectSaga(getCurrentTemplatesPageAgain)
      .provide([[selectPagination, pagination]])
      .select(paginationControlSelector)
      .put(
        actions.getTemplates({
          page: {
            number: pagination.currentPage,
            size: pagination.itemsPerPage,
          },
        }),
      )
      .run();
  });

  it('should get a list of templates with pagination', async () => {
    const action = actions.getTemplates({
      page: { size: 10, number: 1 },
      filter: { label: fakeTemplate.label },
    });

    const apiRequest = matchers.call.fn(Template.getTemplatesList);

    const responseData = {
      getTemplates: {
        templates: [fakeTemplate],
        currentPage: 0,
        totalPages: 1,
      },
    };

    return expectSaga(handleGetTemplates, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_TEMPLATES))
      .put(
        actions.updateTemplates({
          templates: responseData.getTemplates.templates,
          paginationControl: {
            currentPage: responseData.getTemplates.currentPage,
            totalPages: responseData.getTemplates.totalPages,
            itemsPerPage: action.payload.page.size,
          },
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_TEMPLATES))
      .run();
  });

  it('should handle errors if fails to get templates', async () => {
    const action = actions.getTemplates({
      page: { size: 10, number: 1 },
      filter: { label: 'Template' },
    });

    const apiRequest = matchers.call.fn(Template.getTemplatesList);

    return expectSaga(handleGetTemplates, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_TEMPLATES))
      .put(actions.updateTemplates({ templates: [] }))
      .put(loadingActions.removeLoading(constants.GET_TEMPLATES))
      .run();
  });

  it('should get a template by id', async () => {
    const action = actions.getTemplateById({
      templateId: fakeTemplate.id,
    });

    const apiRequest = matchers.call.fn(Template.getTemplateById);

    const responseData = {
      getTemplateById: fakeTemplate,
    };

    return expectSaga(handleGetTemplateById, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_TEMPLATE_BY_ID))
      .put(
        actions.updateTemplates({
          templateData: responseData.getTemplateById,
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_TEMPLATE_BY_ID))
      .run();
  });

  it('should handle errors if fails to get a template by id', async () => {
    const action = actions.getTemplateById({
      templateId: fakeTemplate.id,
    });

    const apiRequest = matchers.call.fn(Template.getTemplateById);

    return expectSaga(handleGetTemplateById, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_TEMPLATE_BY_ID))
      .put(actions.updateTemplates({ templateData: null }))
      .put(loadingActions.removeLoading(constants.GET_TEMPLATE_BY_ID))
      .run();
  });

  it('should delete a template', async () => {
    const action = actions.deleteTemplate({
      templateId: fakeTemplate.id,
    });

    const apiRequest = matchers.call.fn(Template.deleteTemplates);
    const getCurrentPageCall = matchers.call.fn(getCurrentTemplatesPageAgain);

    return expectSaga(handleDeleteTemplate, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_TEMPLATE))
      .put(loadingActions.removeLoading(constants.DELETE_TEMPLATE))
      .run();
  });

  it('should handle errors if fails to delete a template', async () => {
    const action = actions.deleteTemplate({
      templateId: fakeTemplate.id,
    });

    const apiRequest = matchers.call.fn(Template.deleteTemplates);

    return expectSaga(handleDeleteTemplate, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_TEMPLATE))
      .put(loadingActions.removeLoading(constants.DELETE_TEMPLATE))
      .run();
  });

  it('should delete multiple templates', async () => {
    const action = actions.deleteMultipleTemplates({
      templateIds: [fakeTemplate.id],
    });

    const apiRequest = matchers.call.fn(Template.deleteTemplates);
    const getCurrentPageCall = matchers.call.fn(getCurrentTemplatesPageAgain);

    return expectSaga(handleDeleteMultipleTemplates, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_TEMPLATES))
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_TEMPLATES))
      .run();
  });

  it('should handle errors if fails to delete multiple templates', async () => {
    const action = actions.deleteMultipleTemplates({
      templateIds: [fakeTemplate.id],
    });

    const apiRequest = matchers.call.fn(Template.deleteTemplates);

    return expectSaga(handleDeleteMultipleTemplates, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_TEMPLATES))
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_TEMPLATES))
      .run();
  });

  it('should create a template', async () => {
    const successCallback = jest.fn();

    const action = actions.createTemplate({
      label: fakeTemplate.label,
      attrs: fakeTemplate.attrs,
      successCallback,
    });

    const apiRequest = matchers.call.fn(Template.createTemplate);

    return expectSaga(handleCreateTemplate, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.CREATE_TEMPLATE))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_TEMPLATE))
      .run();
  });

  it('should handle errors if fails to create a template', async () => {
    const successCallback = jest.fn();

    const action = actions.createTemplate({
      label: fakeTemplate.label,
      attrs: fakeTemplate.attrs,
      successCallback,
    });

    const apiRequest = matchers.call.fn(Template.createTemplate);

    return expectSaga(handleCreateTemplate, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.CREATE_TEMPLATE))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_TEMPLATE))
      .run();
  });

  it('should edit a template', async () => {
    const successCallback = jest.fn();

    const action = actions.editTemplate({
      id: fakeTemplate.id,
      label: fakeTemplate.label,
      attrs: fakeTemplate.attrs,
      successCallback,
    });

    const apiRequest = matchers.call.fn(Template.editTemplate);

    return expectSaga(handleEditTemplate, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.EDIT_TEMPLATE))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.EDIT_TEMPLATE))
      .run();
  });

  it('should handle errors if fails to edit a template', async () => {
    const successCallback = jest.fn();

    const action = actions.editTemplate({
      id: fakeTemplate.id,
      label: fakeTemplate.label,
      attrs: fakeTemplate.attrs,
      successCallback,
    });

    const apiRequest = matchers.call.fn(Template.editTemplate);

    return expectSaga(handleEditTemplate, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.EDIT_TEMPLATE))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.EDIT_TEMPLATE))
      .run();
  });

  it('should duplicate a template', async () => {
    const action = actions.duplicateTemplate({
      templateId: fakeTemplate.id,
    });

    const apiRequest = matchers.call.fn(Template.duplicateTemplate);
    const getCurrentPageCall = matchers.call.fn(getCurrentTemplatesPageAgain);

    return expectSaga(handleDuplicateTemplate, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DUPLICATE_TEMPLATE))
      .put(loadingActions.removeLoading(constants.DUPLICATE_TEMPLATE))
      .run();
  });

  it('should handle errors if fails to duplicate a template', async () => {
    const action = actions.duplicateTemplate({
      templateId: fakeTemplate.id,
    });

    const apiRequest = matchers.call.fn(Template.duplicateTemplate);

    return expectSaga(handleDuplicateTemplate, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DUPLICATE_TEMPLATE))
      .put(loadingActions.removeLoading(constants.DUPLICATE_TEMPLATE))
      .run();
  });

  it('should watch for an action to get templates', async () => {
    return testSaga(watchGetTemplates)
      .next()
      .takeLatest(constants.GET_TEMPLATES, handleGetTemplates)
      .next()
      .isDone();
  });

  it('should watch for an action to get a template by id', async () => {
    return testSaga(watchGetTemplateById)
      .next()
      .takeLatest(constants.GET_TEMPLATE_BY_ID, handleGetTemplateById)
      .next()
      .isDone();
  });

  it('should watch for an action to delete a template', async () => {
    return testSaga(watchDeleteTemplate)
      .next()
      .takeLatest(constants.DELETE_TEMPLATE, handleDeleteTemplate)
      .next()
      .isDone();
  });

  it('should watch for an action to delete multiple templates', async () => {
    return testSaga(watchDeleteMultipleTemplates)
      .next()
      .takeLatest(constants.DELETE_MULTIPLE_TEMPLATES, handleDeleteMultipleTemplates)
      .next()
      .isDone();
  });

  it('should watch for an action to create a template', async () => {
    return testSaga(watchCreateTemplate)
      .next()
      .takeLatest(constants.CREATE_TEMPLATE, handleCreateTemplate)
      .next()
      .isDone();
  });

  it('should watch for an action to edit a template', async () => {
    return testSaga(watchEditTemplate)
      .next()
      .takeLatest(constants.EDIT_TEMPLATE, handleEditTemplate)
      .next()
      .isDone();
  });

  it('should watch for an action to duplicate a template', async () => {
    return testSaga(watchDuplicateTemplate)
      .next()
      .takeLatest(constants.DUPLICATE_TEMPLATE, handleDuplicateTemplate)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    templateSaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
