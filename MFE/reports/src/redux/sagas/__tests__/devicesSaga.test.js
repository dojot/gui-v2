import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { Device } from 'Services';
import { getUserInformation } from 'sharedComponents/Utils';

import { constants, actions } from '../../modules/devices';
import { actions as loadingActions } from '../../modules/loading';
import { paginationControlSelector } from '../../selectors/devicesSelector';
import {
  deviceSaga,
  getCurrentDevicesPageAgain,
  handleCreateDevice,
  handleDeleteDevice,
  handleDeleteMultipleDevices,
  handleEditDevice,
  handleFavoriteDevice,
  handleGetDeviceById,
  handleGetDevices,
  watchCreateDevice,
  watchDeleteDevice,
  watchDeleteMultipleDevices,
  watchEditDevice,
  watchFavoriteDevice,
  watchGetDeviceById,
  watchGetDevices,
} from '../devicesSaga';

jest.mock('sharedComponents/Utils', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  getErrorTranslation: jest.fn(),
  getUserInformation: jest.fn(),
  toBase64: jest.fn(),
}));

jest.mock('sharedComponents/Hooks', () => ({
  __esModule: true,
  dispatchEvent: jest.fn(),
}));

jest.mock('sharedComponents/Constants', () => ({
  __esModule: true,
  EVENT: 'mocked',
}));

describe('devicesSaga', () => {
  beforeAll(() => {
    // Using fake timers because errorActions.addError uses Date.now()
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.now());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeDevice = {
    id: '1',
    label: 'Device 1',
    attrs: [],
    templates: [1],
  };

  it('should get the current page of devices again', async () => {
    const selectPagination = matchers.select(paginationControlSelector);

    const pagination = {
      currentPage: 1,
      itemsPerPage: 10,
    };

    return expectSaga(getCurrentDevicesPageAgain)
      .provide([[selectPagination, pagination]])
      .select(paginationControlSelector)
      .put(
        actions.getDevices({
          page: {
            number: pagination.currentPage,
            size: pagination.itemsPerPage,
          },
        }),
      )
      .run();
  });

  it('should get a list of devices with pagination', async () => {
    const action = actions.getDevices({
      page: { size: 10, number: 1 },
      filter: { label: fakeDevice.label },
    });

    const apiRequest = matchers.call.fn(Device.getDevicesList);

    const responseData = {
      getDevices: {
        devices: [fakeDevice],
        currentPage: 0,
        totalPages: 1,
      },
    };

    return expectSaga(handleGetDevices, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_DEVICES))
      .put(
        actions.updateDevices({
          devices: responseData.getDevices.devices,
          paginationControl: {
            currentPage: responseData.getDevices.currentPage,
            totalPages: responseData.getDevices.totalPages,
            itemsPerPage: action.payload.page.size,
          },
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_DEVICES))
      .run();
  });

  it('should handle errors if fails to get devices', async () => {
    const action = actions.getDevices({
      page: { size: 10, number: 1 },
      filter: { label: 'Device' },
    });

    const apiRequest = matchers.call.fn(Device.getDevicesList);

    return expectSaga(handleGetDevices, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_DEVICES))
      .put(actions.updateDevices({ devices: [] }))
      .put(loadingActions.removeLoading(constants.GET_DEVICES))
      .run();
  });

  it('should get device by id', async () => {
    const action = actions.getDeviceById({
      deviceId: fakeDevice.id,
    });

    const apiRequest = matchers.call.fn(Device.getDeviceById);

    const responseData = {
      getDeviceById: fakeDevice,
    };

    return expectSaga(handleGetDeviceById, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_DEVICE_BY_ID))
      .put(
        actions.updateDevices({
          deviceData: fakeDevice,
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_DEVICE_BY_ID))
      .run();
  });

  it('should handle errors if fails to get device by id', async () => {
    const action = actions.getDeviceById({
      deviceId: fakeDevice.id,
    });

    const apiRequest = matchers.call.fn(Device.getDeviceById);

    return expectSaga(handleGetDeviceById, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_DEVICE_BY_ID))
      .put(actions.updateDevices({ deviceData: null }))
      .put(loadingActions.removeLoading(constants.GET_DEVICE_BY_ID))
      .run();
  });

  it('should delete a device', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteDevice({
      successCallback,
      deviceId: fakeDevice.id,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(Device.deleteDevices);

    const getCurrentPageCall = matchers.call.fn(getCurrentDevicesPageAgain);

    const getUserInformationCall = matchers.call.fn(getUserInformation);

    const userInformation = { userName: 'admin', tenant: 'admin' };

    return expectSaga(handleDeleteDevice, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
        [getUserInformationCall, userInformation],
      ])
      .put(loadingActions.addLoading(constants.DELETE_DEVICE))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_DEVICE))
      .run();
  });

  it('should handle errors if fails to delete a device', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteDevice({
      successCallback,
      deviceId: fakeDevice.id,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(Device.deleteDevices);

    return expectSaga(handleDeleteDevice, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_DEVICE))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_DEVICE))
      .run();
  });

  it('should delete multiple devices', async () => {
    const action = actions.deleteMultipleDevices({
      deviceIdArray: [fakeDevice.id],
    });

    const apiRequest = matchers.call.fn(Device.deleteDevices);
    const getCurrentPageCall = matchers.call.fn(getCurrentDevicesPageAgain);

    return expectSaga(handleDeleteMultipleDevices, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_DEVICES))
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_DEVICES))
      .run();
  });

  it('should handle errors if fails to delete multiple devices', async () => {
    const action = actions.deleteMultipleDevices({
      deviceIdArray: [fakeDevice.id],
    });

    const apiRequest = matchers.call.fn(Device.deleteDevices);
    const getCurrentPageCall = matchers.call.fn(getCurrentDevicesPageAgain);

    return expectSaga(handleDeleteMultipleDevices, action)
      .provide([
        [apiRequest, throwError(new Error('Failed'))],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_DEVICES))
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_DEVICES))
      .run();
  });

  it('should favorite a device', async () => {
    const action = actions.favoriteDevice({
      deviceId: fakeDevice.id,
    });

    const apiRequest = matchers.call.fn(Device.favoriteDevices);

    const getCurrentPageCall = matchers.call.fn(getCurrentDevicesPageAgain);

    const getUserInformationCall = matchers.call.fn(getUserInformation);

    const userInformation = { userName: 'admin', tenant: 'admin' };

    return expectSaga(handleFavoriteDevice, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
        [getUserInformationCall, userInformation],
      ])
      .put(loadingActions.addLoading(constants.FAVORITE_DEVICE))
      .put(loadingActions.removeLoading(constants.FAVORITE_DEVICE))
      .run();
  });

  it('should handle errors if fails to favorite a device', async () => {
    const action = actions.favoriteDevice({
      deviceId: fakeDevice.id,
    });

    const apiRequest = matchers.call.fn(Device.favoriteDevices);

    const getUserInformationCall = matchers.call.fn(getUserInformation);

    const userInformation = { userName: 'admin', tenant: 'admin' };

    return expectSaga(handleFavoriteDevice, action)
      .provide([
        [apiRequest, throwError(new Error('Failed'))],
        [getUserInformationCall, userInformation],
      ])
      .put(loadingActions.addLoading(constants.FAVORITE_DEVICE))
      .put(loadingActions.removeLoading(constants.FAVORITE_DEVICE))
      .run();
  });

  it('should edit a device', async () => {
    const successCallback = jest.fn();

    const action = actions.editDevice({
      successCallback,
      id: fakeDevice.id,
      label: fakeDevice.label,
      attrs: fakeDevice.attrs,
      templates: fakeDevice.templates,
    });

    const apiRequest = matchers.call.fn(Device.editDevice);

    return expectSaga(handleEditDevice, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.EDIT_DEVICE))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.EDIT_DEVICE))
      .run();
  });

  it('should handle errors if fails to edit a device', async () => {
    const successCallback = jest.fn();

    const action = actions.editDevice({
      successCallback,
      id: fakeDevice.id,
      label: fakeDevice.label,
      attrs: fakeDevice.attrs,
      templates: fakeDevice.templates,
    });

    const apiRequest = matchers.call.fn(Device.editDevice);

    return expectSaga(handleEditDevice, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.EDIT_DEVICE))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.EDIT_DEVICE))
      .run();
  });

  it('should create a device', async () => {
    const successCallback = jest.fn();

    const action = actions.createDevice({
      successCallback,
      label: fakeDevice.label,
      attrs: fakeDevice.attrs,
      fingerprint: 'fingerprint',
      templates: fakeDevice.templates,
    });

    const apiRequest = matchers.call.fn(Device.createDevice);

    return expectSaga(handleCreateDevice, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.CREATE_DEVICE))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_DEVICE))
      .run();
  });

  it('should handle errors if fails to create a device', async () => {
    const successCallback = jest.fn();

    const action = actions.createDevice({
      successCallback,
      label: fakeDevice.label,
      attrs: fakeDevice.attrs,
      fingerprint: 'fingerprint',
      templates: fakeDevice.templates,
    });

    const apiRequest = matchers.call.fn(Device.createDevice);

    return expectSaga(handleCreateDevice, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.CREATE_DEVICE))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_DEVICE))
      .run();
  });

  it('should watch for an action to get devices', async () => {
    return testSaga(watchGetDevices)
      .next()
      .takeLatest(constants.GET_DEVICES, handleGetDevices)
      .next()
      .isDone();
  });

  it('should watch for an action to get a device by id', async () => {
    return testSaga(watchGetDeviceById)
      .next()
      .takeLatest(constants.GET_DEVICE_BY_ID, handleGetDeviceById)
      .next()
      .isDone();
  });

  it('should watch for an action to delete a device', async () => {
    return testSaga(watchDeleteDevice)
      .next()
      .takeLatest(constants.DELETE_DEVICE, handleDeleteDevice)
      .next()
      .isDone();
  });

  it('should watch for an action to delete multiple devices', async () => {
    return testSaga(watchDeleteMultipleDevices)
      .next()
      .takeLatest(constants.DELETE_MULTIPLE_DEVICES, handleDeleteMultipleDevices)
      .next()
      .isDone();
  });

  it('should watch for an action to favorite a device', async () => {
    return testSaga(watchFavoriteDevice)
      .next()
      .takeLatest(constants.FAVORITE_DEVICE, handleFavoriteDevice)
      .next()
      .isDone();
  });

  it('should watch for an action to edit a device', async () => {
    return testSaga(watchEditDevice)
      .next()
      .takeLatest(constants.EDIT_DEVICE, handleEditDevice)
      .next()
      .isDone();
  });

  it('should watch for an action to create a device', async () => {
    return testSaga(watchCreateDevice)
      .next()
      .takeLatest(constants.CREATE_DEVICE, handleCreateDevice)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    deviceSaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
