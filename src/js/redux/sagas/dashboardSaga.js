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

const mergeValues = (obj1, obj2) => {
  const obj = {};
  if (Array.isArray(obj1)) {
    return obj1;
  }
  if (obj1) {
    Object.entries(obj1).forEach(([key, value]) => {
      obj[key] = value;
    });
  }

  if (obj2) {
    Object.entries(obj2).forEach(([key, value]) => {
      obj[key] = value;
    });
  }
  return obj;
};

function* pollData(queries, interval) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const realTimeQuery of queries) {
      const {
        getDeviceHistoryForDashboard,
      } = yield Device.getDevicesHistoryParsed(realTimeQuery.query);
      if (getDeviceHistoryForDashboard) {
        yield put(
          dashboardActions.updateValues({
            [realTimeQuery.key]: mergeValues(
              JSON.parse(getDeviceHistoryForDashboard),
              realTimeQuery.query.staticAttributes,
            ),
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
  const { staticQueries = [], realTimeQueries = [] } = getQueriesFromSchema(
    payload,
  );
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
