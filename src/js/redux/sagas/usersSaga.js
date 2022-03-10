import { put, takeLatest, call, fork } from 'redux-saga/effects';
import { User } from 'Services';
import { setUserInformation } from 'Utils';

import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { constants } from '../modules/users';

export function* handleGetUserData() {
  try {
    yield put(loadingActions.addLoading(constants.GET_USER_DATA));
    const { data } = yield call(User.getUserData);
    const { tenant, username, profile } = data;
    setUserInformation(tenant, username, profile);
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getUserData',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_USER_DATA));
  }
}

export function* watchGetUserData() {
  yield takeLatest(constants.GET_USER_DATA, handleGetUserData);
}

export const userSaga = [fork(watchGetUserData)];
