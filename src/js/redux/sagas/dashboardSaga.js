import _ from 'lodash';
import {
  call,
  cancel,
  fork,
  put,
  race,
  take,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { Configuration, Device } from 'Services';
import { getUserInformation } from 'Utils';

import { actions as dashboardActions, constants as dashboardConstants } from '../modules/dashboard';

const delay = duration => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
};

const getStoreContent = (state, key) => state.dashboard.get(key);

const getQueriesFromSchema = schema => {
  const realTimeQueries = [];
  const staticQueries = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in schema) {
    if (schema[key].isRealTime) {
      realTimeQueries.push({
        key,
        query: schema[key],
      });
    } else {
      staticQueries.push({
        key,
        query: schema[key],
      });
    }
  }
  return { staticQueries, realTimeQueries };
};

function* pollData(queries, interval) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const realTimeQuery of queries) {
      const { getDeviceHistoryForDashboard } = yield Device.getDevicesHistoryParsed(
        realTimeQuery.query,
      );

      if (getDeviceHistoryForDashboard) {
        yield put(
          dashboardActions.updateValues({
            [realTimeQuery.key]: JSON.parse(getDeviceHistoryForDashboard),
          }),
        );
      }
    }
    yield call(delay, interval);
  } catch (error) {
    console.error(error);
    yield put(dashboardActions.errorPolling(error));
  }
}

function* pollDashboard({ payload }) {
  const { staticQueries = [], realTimeQueries = [] } = getQueriesFromSchema(payload);
  yield call(pollData, staticQueries, 0);

  while (true) {
    const { end } = yield race({
      // TODO: Make the timing adjustable.
      // For now the timer is set to 15 seconds
      poll: call(pollData, realTimeQueries, 15000),
      end: take(dashboardConstants.STOP_POLLING),
    });
    if (end) {
      yield cancel();
    }
  }
}

function* checkData() {
  const { userName, tenant } = getUserInformation();
  try {
    const { getConfig } = yield Configuration.getDashboardConfig(userName, tenant);
    const parserObject = JSON.parse(getConfig);
    if (!_.isEmpty(parserObject)) {
      yield put(dashboardActions.restoreData(parserObject));
    }
  } catch (e) {
    console.error(e);
  }
}

function* updateData({ payload: { layout } }) {
  const { userName, tenant } = getUserInformation();

  try {
    const exportConfig = JSON.stringify({
      layout,
      configs: yield select(store => getStoreContent(store, 'configs')),
      saga: yield select(store => getStoreContent(store, 'saga')),
      wizardContext: yield select(state => getStoreContent(state, 'wizardContext')),
    });
    yield Configuration.updateDashboardConfig(userName, tenant, exportConfig);
    yield put(dashboardActions.updateLayout(layout));
  } catch (e) {
    console.error(e);
  }
}

function* updateWizard({ payload: { state } }) {
  const { userName, tenant } = getUserInformation();
  const wizardContext = yield select(store => getStoreContent(store, 'wizardContext'));
  try {
    const exportConfig = JSON.stringify({
      layout: yield select(store => getStoreContent(store, 'layout')),
      configs: yield select(store => getStoreContent(store, 'configs')),
      saga: yield select(store => getStoreContent(store, 'saga')),
      wizardContext: { ...wizardContext, ...state },
    });
    yield Configuration.updateDashboardConfig(userName, tenant, exportConfig);
  } catch (e) {
    console.error(e);
  }
}

function* watchGetDashboard() {
  yield takeEvery(dashboardConstants.START_POLLING, pollDashboard);
  yield takeLatest(dashboardConstants.CHECK_STATE, checkData);
  yield takeLatest(dashboardConstants.CHANGE_LAYOUT, updateData);
  yield takeLatest(dashboardConstants.ADD_WIZARD_STATE, updateWizard);
}

export const dashboardSaga = [fork(watchGetDashboard)];
