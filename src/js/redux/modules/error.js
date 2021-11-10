import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const ADD_ERROR = 'app/loading/ADD_ERROR';
const REMOVE_ERROR = 'app/loading/REMOVE_ERROR';

export const constants = {
  ADD_ERROR,
  REMOVE_ERROR,
};

export const addError = createAction(ADD_ERROR, ({ message }) => {
  const timestamp = Date.now();
  return { id: timestamp, message };
});

export const removeError = createAction(REMOVE_ERROR, errorId => ({ errorId }));

export const actions = {
  addError,
  removeError,
};

export const reducers = {
  [ADD_ERROR]: (state, { payload }) => {
    return state.merge({ errors: { ...state.errors, [payload.id]: payload } });
  },
  [REMOVE_ERROR]: (state, { payload }) => {
    const errors = state.get('errors');
    delete errors[payload.errorId];
    return state.merge({ errors });
  },
};

export const initialState = () => {
  return Map({
    errors: {},
  });
};

export default handleActions(reducers, initialState());
