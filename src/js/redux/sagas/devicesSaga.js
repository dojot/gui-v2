import { put, fork, takeLatest } from 'redux-saga/effects';
import { Device } from 'Services';
import {
  constants as deviceConstants,
  actions as deviceActions,
} from '../modules/devices';

export function* fetchExampleData(data) {
  try {
    const { page, filter } = data.payload;
    const { getDevices } = yield Device.getDevicesList(page, filter);
    if (getDevices) {
      yield put(deviceActions.updateDevices(getDevices));
    } else {
      yield put(
        deviceActions.updateDevices({
          devices: [],
          totalPages: 0,
          currentPage: 1,
        }),
      );
    }
  } catch (e) {
    // TODO: Handle the exception more appropriately
    yield put(deviceActions.updateDevices([]));
  }
}

function* watchGetDevices() {
  yield takeLatest(deviceConstants.GET_DEVICES, fetchExampleData);
}

export const deviceSaga = [fork(watchGetDevices)];
