import { all } from 'redux-saga/effects';

import { templateAttrsSaga } from './templateAttrsSaga';
import { templateSaga } from './templatesSaga';

export default function* sagas() {
  yield all([
    ...templateSaga,
    ...templateAttrsSaga,
  ]);
}
