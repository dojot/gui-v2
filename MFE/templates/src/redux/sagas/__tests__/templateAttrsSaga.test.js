import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { TemplateAttr } from 'Services';

import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from 'sharedComponents/Constants';
import { actions as loadingActions } from '../../modules/loading';
import { constants, actions } from '../../modules/templateAttrs';
import {
  handleCreateAttr,
  handleDeleteAttr,
  handleDeleteMultipleAttrs,
  handleEditAttr,
  templateAttrsSaga,
  watchCreateAttr,
  watchDeleteAttr,
  watchDeleteMultipleAttrs,
  watchEditAttr,
} from '../templateAttrsSaga';

describe('templatesSaga', () => {
  beforeAll(() => {
    // Using fake timers because errorActions.addError uses Date.now()
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.now());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeAttr = {
    id: '1',
    label: 'Attr_1',
    staticValue: '',
    templateId: '1',
    type: TEMPLATE_ATTR_TYPES.DYNAMIC.value,
    valueType: TEMPLATE_ATTR_VALUE_TYPES.BOOL.value,
  };

  it('should delete an attr', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteAttr({
      attrId: fakeAttr.id,
      templateId: fakeAttr.templateId,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.deleteTemplateAttrs);

    return expectSaga(handleDeleteAttr, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.DELETE_ATTR))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_ATTR))
      .run();
  });

  it('should handle errors if fails to delete an attr', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteAttr({
      attrId: fakeAttr.id,
      templateId: fakeAttr.templateId,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.deleteTemplateAttrs);

    return expectSaga(handleDeleteAttr, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_ATTR))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_ATTR))
      .run();
  });

  it('should delete multiple attrs', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteMultipleAttrs({
      attrIds: [fakeAttr.id],
      templateId: fakeAttr.templateId,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.deleteTemplateAttrs);

    return expectSaga(handleDeleteMultipleAttrs, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_ATTRS))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_ATTRS))
      .run();
  });

  it('should handle errors if fails to delete multiple attrs', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteMultipleAttrs({
      attrIds: [fakeAttr.id],
      templateId: fakeAttr.templateId,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.deleteTemplateAttrs);

    return expectSaga(handleDeleteMultipleAttrs, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_ATTRS))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_ATTRS))
      .run();
  });

  it('should create an attr', async () => {
    const successCallback = jest.fn();

    const action = actions.createAttr({
      templateId: fakeAttr.templateId,
      attr: fakeAttr,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.createTemplateAttr);

    return expectSaga(handleCreateAttr, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.CREATE_ATTR))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_ATTR))
      .run();
  });

  it('should handle errors if fails to create an attr', async () => {
    const successCallback = jest.fn();

    const action = actions.createAttr({
      templateId: fakeAttr.templateId,
      attr: fakeAttr,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.createTemplateAttr);

    return expectSaga(handleCreateAttr, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.CREATE_ATTR))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_ATTR))
      .run();
  });

  it('should edit an attr', async () => {
    const successCallback = jest.fn();

    const action = actions.editAttr({
      templateId: fakeAttr.templateId,
      attrId: fakeAttr.id,
      attr: fakeAttr,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.editTemplateAttr);

    return expectSaga(handleEditAttr, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.EDIT_ATTR))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.EDIT_ATTR))
      .run();
  });

  it('should handle errors if fails to edit an attr', async () => {
    const successCallback = jest.fn();

    const action = actions.editAttr({
      templateId: fakeAttr.templateId,
      attrId: fakeAttr.id,
      attr: fakeAttr,
      successCallback,
    });

    const apiRequest = matchers.call.fn(TemplateAttr.editTemplateAttr);

    return expectSaga(handleEditAttr, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.EDIT_ATTR))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.EDIT_ATTR))
      .run();
  });

  it('should watch for an action to delete an attr', async () => {
    return testSaga(watchDeleteAttr)
      .next()
      .takeLatest(constants.DELETE_ATTR, handleDeleteAttr)
      .next()
      .isDone();
  });

  it('should watch for an action to delete multiple attrs', async () => {
    return testSaga(watchDeleteMultipleAttrs)
      .next()
      .takeLatest(constants.DELETE_MULTIPLE_ATTRS, handleDeleteMultipleAttrs)
      .next()
      .isDone();
  });

  it('should watch for an action to create an attr', async () => {
    return testSaga(watchCreateAttr)
      .next()
      .takeLatest(constants.CREATE_ATTR, handleCreateAttr)
      .next()
      .isDone();
  });

  it('should watch for an action to edit an attr', async () => {
    return testSaga(watchEditAttr)
      .next()
      .takeLatest(constants.EDIT_ATTR, handleEditAttr)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    templateAttrsSaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
