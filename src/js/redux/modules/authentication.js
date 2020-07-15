import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const GET_USER_TOKEN = 'app/authentication/GET_USER_TOKEN';
const UPDATE_TOKEN_STATUS = 'app/authentication/UPDATE_TOKEN_STATUS';
const AUTHENTICATION_ERROR = 'app/authentication/AUTHENTICATION_ERROR';

export const constants = {
  GET_USER_TOKEN,
  UPDATE_TOKEN_STATUS,
  AUTHENTICATION_ERROR,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getUserToken = createAction(GET_USER_TOKEN, (user, password) => ({
  user,
  password,
}));
export const authenticationError = createAction(
  AUTHENTICATION_ERROR,
  error => ({ error }),
);
export const updateTokenStatus = createAction(
  UPDATE_TOKEN_STATUS,
  hasToken => ({ hasToken }),
);

export const actions = {
  getUserToken,
  updateTokenStatus,
  authenticationError,
};

export const reducers = {
  [AUTHENTICATION_ERROR]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
  [UPDATE_TOKEN_STATUS]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
};

export const initialState = () =>
  Map({
    error: '',
    hasToken: false,
  });

export default handleActions(reducers, initialState());
