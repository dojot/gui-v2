import { put, fork, takeLatest } from 'redux-saga/effects';
import dummy from 'Assets/jsons/deviceList.json';
import { getDevicesListQuery } from 'Utils';
import { getWithGraphQL } from 'APIs';
import {
  constants as deviceConstants,
  actions as deviceActions,
} from '../modules/devices';

export function* fetchExampleData() {
  const page = { size: 999999, number: 1 };
  const respose = yield getWithGraphQL(getDevicesListQuery(page));
  const { getDevices } = respose;
  if (getDevices) {
    console.log(getDevices.devices);
    yield put(deviceActions.updateDevices(getDevices.devices));
  } else {
    yield put(deviceActions.updateDevices([]));
  }
}

function* watchGetDevices() {
  yield takeLatest(deviceConstants.GET_DEVICES, fetchExampleData);
}

export const deviceSaga = [fork(watchGetDevices)];
