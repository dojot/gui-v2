import { all } from 'redux-saga/effects';

import { deviceSaga } from './devicesSaga';
import { certificatesSaga } from './certificatesSaga';
import { templateSaga } from './templatesSaga';
import { reportsSaga } from './reportsSaga';

export default function* sagas() {
  yield all([...deviceSaga, ...certificatesSaga, ...templateSaga, ...reportsSaga]);
}
