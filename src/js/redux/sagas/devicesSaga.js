import { put, fork, takeLatest } from 'redux-saga/effects';
import { Device } from 'Services';
import {
  constants as deviceConstants,
  actions as deviceActions,
} from '../modules/devices';

export function* fetchExampleData() {
  try {
    const page = { size: 999999, number: 1 };
    const { getDevices } = yield Device.getDevicesList(page);
    if (getDevices) {
      yield put(deviceActions.updateDevices(getDevices.devices));
    } else {
      yield put(deviceActions.updateDevices([]));
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
