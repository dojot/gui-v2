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
import { Configuration, Device } from '../../adapters/services';
import { getUserInformation } from '../../adapters/localStorage/login.localStorage';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';

import { actions as dashboardActions, constants as dashboardConstants } from '../modules/dashboard';

export const delay = duration => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
};

const getStoreContent = (state, key) => state.dashboard.get(key);

export const getQueriesFromSchema = schema => {
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

export function* pollData(queries, interval) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const realTimeQuery of queries) {
      const { getDeviceHistoryForDashboard } = yield call(
        Device.getDevicesHistoryParsed,
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
    yield put(dashboardActions.errorPolling(error));
    yield put(dashboardActions.stopPolling());
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: error.message,
      type: "error",
    });
  }
}

export function* pollDashboard({ payload }) {
  const { staticQueries = [], realTimeQueries = [] } = yield call(getQueriesFromSchema, payload);

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

export function* checkData() {
  try {
    const { userName, tenant } = yield call(getUserInformation);
    const { getConfig } = yield call(Configuration.getDashboardConfig, userName, tenant);
    const parserObject = JSON.parse(getConfig);
    if (!_.isEmpty(parserObject)) {
      yield put(dashboardActions.restoreData(parserObject));
    }
  } catch (error) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: error.message,
      type: "error",
    });
  }
}

export function* updateData({ payload: { layout } }) {
  const { userName, tenant } = yield call(getUserInformation);

  try {
    const exportConfig = JSON.stringify({
      layout,
      configs: yield select(store => getStoreContent(store, 'configs')),
      saga: yield select(store => getStoreContent(store, 'saga')),
      wizardContext: yield select(state => getStoreContent(state, 'wizardContext')),
    });
    yield call(Configuration.updateDashboardConfig, userName, tenant, exportConfig);
    yield put(dashboardActions.updateLayout(layout));
  } catch (error) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: error.message,
      type: "error",
    });
  }
}

export function* updateWizard({ payload: { state } }) {
  const { userName, tenant } = call(getUserInformation);
  const wizardContext = yield select(store => getStoreContent(store, 'wizardContext'));
  try {
    const exportConfig = JSON.stringify({
      layout: yield select(store => getStoreContent(store, 'layout')),
      configs: yield select(store => getStoreContent(store, 'configs')),
      saga: yield select(store => getStoreContent(store, 'saga')),
      wizardContext: { ...wizardContext, ...state },
    });
    yield call(Configuration.updateDashboardConfig, userName, tenant, exportConfig);
  } catch (error) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: error.message,
      type: "error",
    });
  }
}

export function* watchGetDashboard() {
  yield takeEvery(dashboardConstants.START_POLLING, pollDashboard);
  yield takeLatest(dashboardConstants.CHECK_STATE, checkData);
  yield takeLatest(dashboardConstants.CHANGE_LAYOUT, updateData);
  yield takeLatest(dashboardConstants.ADD_WIZARD_STATE, updateWizard);
}

export const dashboardSaga = [fork(watchGetDashboard)];
