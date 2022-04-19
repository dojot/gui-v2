import { Map } from 'immutable';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { Configuration, Device } from 'Services';
import { getUserInformation } from 'sharedComponents/Utils';

import {
  actions as dashboardActions,
  constants as dashboardConstants,
} from '../../modules/dashboard';
import {
  checkData,
  dashboardSaga,
  delay,
  pollDashboard,
  pollData,
  updateData,
  updateWizard,
  watchGetDashboard,
} from '../dashboardSaga';

describe('dashboardSaga', () => {
  const getUserInformationCall = matchers.call.fn(getUserInformation);
  const userInformation = { userName: 'admin', tenant: 'admin' };

  const storeState = {
    dashboard: Map({
      saga: {},
      layout: {},
      configs: {},
      wizardContext: {},
    }),
  };

  it('should poll data correctly', async () => {
    const interval = 0;

    const firstQueryKey = 'test';
    const queries = [{ key: firstQueryKey, query: 'query' }];

    const deviceHistoryCall = matchers.call.fn(Device.getDevicesHistoryParsed);

    const deviceHistoryData = {
      getDeviceHistoryForDashboard: '{}',
    };

    const delayCall = matchers.call.fn(delay);

    return expectSaga(pollData, queries, interval)
      .provide([
        [deviceHistoryCall, deviceHistoryData],
        [delayCall, null],
      ])
      .put(
        dashboardActions.updateValues({
          [firstQueryKey]: JSON.parse(deviceHistoryData.getDeviceHistoryForDashboard),
        }),
      )
      .call.fn(Device.getDevicesHistoryParsed)
      .run();
  });

  it('should poll dashboard correctly', async () => {
    const action = dashboardActions.startPolling({
      test: 'test',
    });
    const deviceHistoryCall = matchers.call.fn(Device.getDevicesHistoryParsed);
    const deviceHistoryData = {
      getDeviceHistoryForDashboard: '{}',
    };
    return expectSaga(pollDashboard, action)
      .provide([[deviceHistoryCall, deviceHistoryData]])
      .dispatch({ type: dashboardConstants.STOP_POLLING })
      .run();
  });

  it('should check data correctly', async () => {
    const getDashboardConfigCall = matchers.call.fn(Configuration.getDashboardConfig);

    const getConfig = { test: 'test' };

    const dashboardCOnfigResponseData = {
      getConfig: JSON.stringify(getConfig),
    };

    return expectSaga(checkData)
      .provide([
        [getDashboardConfigCall, dashboardCOnfigResponseData],
        [getUserInformationCall, userInformation],
      ])
      .put(dashboardActions.restoreData(getConfig))
      .call.fn(Configuration.getDashboardConfig)
      .run();
  });

  it('should update data correctly', async () => {
    const layout = { test: 'test' };
    const action = dashboardActions.updateLayout(layout);

    const updateDashboardConfigCall = matchers.call.fn(Configuration.updateDashboardConfig);

    const getConfig = { test: 'test' };

    return expectSaga(updateData, action)
      .provide([
        [updateDashboardConfigCall, null],
        [getUserInformationCall, userInformation],
      ])
      .withState(storeState)
      .put(dashboardActions.updateLayout(getConfig))
      .call.fn(Configuration.updateDashboardConfig)
      .run();
  });

  it('should update wizard correctly', async () => {
    const action = dashboardActions.addWizardState({ test: 'test' });

    const updateDashboardConfigCall = matchers.call.fn(Configuration.updateDashboardConfig);

    return expectSaga(updateWizard, action)
      .provide([
        [updateDashboardConfigCall, null],
        [getUserInformationCall, userInformation],
      ])
      .withState(storeState)
      .call.fn(Configuration.updateDashboardConfig)
      .run();
  });

  it('should watch actions to get dashboard data', async () => {
    return testSaga(watchGetDashboard)
      .next()
      .takeEvery(dashboardConstants.START_POLLING, pollDashboard)
      .next()
      .takeLatest(dashboardConstants.CHECK_STATE, checkData)
      .next()
      .takeLatest(dashboardConstants.CHANGE_LAYOUT, updateData)
      .next()
      .takeLatest(dashboardConstants.ADD_WIZARD_STATE, updateWizard)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    dashboardSaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
