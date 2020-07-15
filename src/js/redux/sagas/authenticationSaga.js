import { put, fork, takeLatest } from 'redux-saga/effects';
import { constants, actions } from 'Redux/authentication';
import { getAuthGraphQL } from 'APIs';
import { getUserTokenQuery, login as loginAction } from 'Utils';

export function* fetchUserToken({ payload }) {
  const { user, password } = payload;
  try {
    const result = yield getAuthGraphQL(getUserTokenQuery(user, password));
    const { login = null } = result;
    if (login) {
      loginAction(login.jwt);
      yield put(actions.updateTokenStatus(true));
      yield put(actions.authenticationError(''));
    } else {
      yield put(actions.authenticationError('error'));
    }
  } catch (e) {
    yield put(actions.authenticationError(e));
  }
}

function* watchGetExample() {
  yield takeLatest(constants.GET_USER_TOKEN, fetchUserToken);
}

export const authenticationSaga = [fork(watchGetExample)];
