import { put, fork, takeLatest } from 'redux-saga/effects';

import { constants as exampleConstants, actions as exampleActions } from '../modules/example';

export function* fetchExampleData() {
  // pretend there is an api call
  const result = {
    title: 'Everything is Awesome',
    description: __CONFIG__.description,
    source: 'This message is coming from Redux',
  };

  yield put(exampleActions.updateExample(result));
}

function* watchGetExample() {
  yield takeLatest(exampleConstants.GET_EXAMPLE, fetchExampleData);
}

export const exampleSaga = [fork(watchGetExample)];
