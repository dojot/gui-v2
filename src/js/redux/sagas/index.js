import { all } from 'redux-saga/effects';

import { dashboardSaga } from './dashboardSaga';
import { deviceSaga } from './devicesSaga';
import { exampleSaga } from './exampleSaga';
import { templateAttrsSaga } from './templateAttrsSaga';
import { templateSaga } from './templatesSaga';

export default function* sagas() {
  yield all([
    ...exampleSaga,
    ...deviceSaga,
    ...dashboardSaga,
    ...templateSaga,
    ...templateAttrsSaga,
  ]);
}
