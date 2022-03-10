import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_USER_DATA = 'app/user/GET_USER_DATA';

export const constants = {
  GET_USER_DATA,
};

export const getUserData = createAction(GET_USER_DATA);

export const actions = {
  getUserData,
};

export const reducers = {};

export const initialState = () => {
  return Map({});
};

export default handleActions(reducers, initialState());
