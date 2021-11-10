import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const ADD_ERROR = 'app/loading/ADD_ERROR';
const REMOVE_ERROR = 'app/loading/REMOVE_ERROR';

export const constants = {
  ADD_ERROR,
  REMOVE_ERROR,
};

export const addError = createAction(ADD_ERROR, ({ message, i18nMessage }) => {
  const timestamp = Date.now().toString();
  return { id: timestamp, message, i18nMessage };
});

export const removeError = createAction(REMOVE_ERROR, errorId => ({ errorId }));

export const actions = {
  addError,
  removeError,
};

export const reducers = {
  [ADD_ERROR]: (state, { payload }) => {
    return state.mergeDeep({ errors: { [payload.id]: payload } });
  },
  [REMOVE_ERROR]: (state, { payload }) => {
    const errors = { ...state.get('errors') };
    delete errors[payload.errorId];
    return state.set('errors', errors);
  },
};

export const initialState = () => {
  return Map({
    errors: {},
  });
};

export default handleActions(reducers, initialState());
