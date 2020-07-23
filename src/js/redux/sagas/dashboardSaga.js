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
} from 'redux-saga/effects';
import { Configuration, Device } from 'Services';
import { getUserInformation } from 'Utils';

import {
  actions as dashboardActions,
  constants as dashboardConstants,
} from '../modules/dashboard';

const delay = duration => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
};

const getRealTimeQueriesFromSchema = schema => {
  return Object.keys(schema)
    .filter(queryKey => schema[queryKey].isRealTime === true)
    .map(key => ({
      key,
      query: schema[key],
    }));
};

function* pollData(schema) {
  try {
    const realTimeQueries = getRealTimeQueriesFromSchema(schema);

    // eslint-disable-next-line no-restricted-syntax
    for (const realTimeQuery of realTimeQueries) {
      const {
        getDeviceHistoryForDashboard,
      } = yield Device.getDevicesHistoryParsed(realTimeQuery.query);

      if (getDeviceHistoryForDashboard) {
        yield put(
          dashboardActions.updateValues({
            [realTimeQuery.key]: JSON.parse(getDeviceHistoryForDashboard),
          }),
        );
      }
    }
    // TODO: MMake the timing adjustable.
    // For now the timer is set to 15 seconds
    yield call(delay, 15000);
  } catch (error) {
    console.error(error);
    yield put(dashboardActions.errorPolling(error));
  }
}

function* pollDashboard({ payload }) {
  while (true) {
    const { end } = yield race({
      poll: call(pollData, payload),
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
    const { getConfig } = yield Configuration.getDashboardConfig(
      userName,
      tenant,
    );
    const parserObject = JSON.parse(getConfig);
    if (!_.isEmpty(parserObject)) {
      yield put(dashboardActions.restoreData(parserObject));
    }
  } catch (e) {
    console.error(e);
  }
}

function* updateData({ payload: { layout, configs, saga } }) {
  const { userName, tenant } = getUserInformation();
  try {
    const exportConfig = JSON.stringify({
      layout,
      configs,
      saga,
    });
    yield Configuration.updateDashboardConfig(userName, tenant, exportConfig);
    yield put(dashboardActions.updateLayout(layout));
  } catch (e) {
    console.error(e);
  }
}

function* watchGetDashboard() {
  yield takeEvery(dashboardConstants.START_POLLING, pollDashboard);
  yield takeLatest(dashboardConstants.CHECK_STATE, checkData);
  yield takeLatest(dashboardConstants.CHANGE_LAYOUT, updateData);
}

export const dashboardSaga = [fork(watchGetDashboard)];
