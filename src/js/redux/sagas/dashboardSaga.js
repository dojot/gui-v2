import {
  race,
  call,
  put,
  fork,
  take,
  takeEvery,
  cancel,
} from 'redux-saga/effects';
import { Device } from 'Services';
import {
  constants as dashboardConstants,
  actions as dashboardActions,
} from '../modules/dashboard';

const delay = duration => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
};

let count = 0;

function* pollData(schema) {
  try {
    for (const key in schema) {
      const response = yield Device.getDevicesHistory(schema[key]);
    }

    yield call(delay, 1000);
    count += 1;
    const response = {
      data: {
        timestamp: count,
        uv: Math.floor(Math.random() * 100),
        pv: Math.floor(Math.random() * 100),
        amt: Math.floor(Math.random() * 100),
      },
    };
    const condition = 'data' in response;
    if (condition) yield put(dashboardActions.updateValues(response.data));
  } catch (error) {
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

function* watchGetDashboard() {
  yield takeEvery(dashboardConstants.START_POLLING, pollDashboard);
}

export const dashboardSaga = [fork(watchGetDashboard)];
