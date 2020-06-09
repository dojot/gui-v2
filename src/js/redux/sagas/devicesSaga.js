import { put, fork, takeLatest } from 'redux-saga/effects'
import dummy from 'Assets/jsons/deviceList.json'
import {
  constants as deviceConstants,
  actions as deviceActions,
} from '../modules/devices'

export function* fetchExampleData() {
  yield put(deviceActions.updateDevices(dummy.data))
}

function* watchGetDevices() {
  yield takeLatest(deviceConstants.GET_DEVICES, fetchExampleData)
}

export const deviceSaga = [fork(watchGetDevices)]
