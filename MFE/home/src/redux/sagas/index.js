import { all } from 'redux-saga/effects';

import { deviceSaga } from './devicesSaga';

export default function* sagas() {
  yield all([...deviceSaga]);
}
