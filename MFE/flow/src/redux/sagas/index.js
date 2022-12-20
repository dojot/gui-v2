import { all } from 'redux-saga/effects';

import { FlowSaga } from './flowsSaga';

export default function* sagas() {
  yield all([...FlowSaga]);
}
