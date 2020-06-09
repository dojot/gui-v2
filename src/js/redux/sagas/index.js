import { all } from 'redux-saga/effects';
import { exampleSaga } from './exampleSaga';
import { deviceSaga } from './devicesSaga';
import { dashboardSaga } from './dashboardSaga';

export default function* sagas() {
  yield all([...exampleSaga, ...deviceSaga, ...dashboardSaga]);
}
