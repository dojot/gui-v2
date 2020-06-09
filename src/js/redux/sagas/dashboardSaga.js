import {
  race, call, put, fork, take, takeEvery, cancel,
} from 'redux-saga/effects'
import { constants as deviceConstants } from 'Redux/devices'
import { fetchExampleData } from 'Sagas/devicesSaga'
import {
  constants as dashboardConstants,
  actions as dashboardActions,
} from '../modules/dashboard'

import type { exampleType } from '../../common/types/example'

function delay(duration) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), duration)
  });
  return promise;
}

function* pollData() {
  try {
    yield call(delay, 2000);
    // const response = yield call(get, url)
    const response = { data: { value: Math.floor(Math.random() * 100) } }
    const condition = 'data' in response;
    if (condition) yield put(dashboardActions.updateValues(response.data))
  } catch (error) {
    yield put(dashboardActions.errorPolling(error))
  }
}

function* pollDashboard() {
  while (true) {
    const { end } = yield race({
      poll: call(pollData),
      end: take(dashboardConstants.STOP_POLLING),
    });
    if (end) {
      yield cancel();
    }
  }
}

function* watchGetDashboard() {
  yield takeEvery(dashboardConstants.START_POLLING, pollDashboard)
}

export const dashboardSaga = [fork(watchGetDashboard)]
