import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const ADD_LOADING = 'app/loading/ADD_LOADING';
const REMOVE_LOADING = 'app/loading/REMOVE_LOADING';

export const constants = {
  ADD_LOADING,
  REMOVE_LOADING,
};

export const addLoading = createAction(ADD_LOADING, (...keys) => {
  const loadingToAdd = {};

  keys.forEach(key => {
    loadingToAdd[key] = true;
  });

  return loadingToAdd;
});

export const removeLoading = createAction(REMOVE_LOADING, (...keys) => ({ keys }));

export const actions = {
  addLoading,
  removeLoading,
};

export const reducers = {
  [ADD_LOADING]: (state, { payload }) => {
    return state.merge({ loading: { ...state.loading, ...payload } });
  },
  [REMOVE_LOADING]: (state, { payload }) => {
    const newLoading = state.get('loading');

    payload.keys.forEach(key => {
      delete newLoading[key];
    });

    return state.merge({ loading: newLoading });
  },
};

export const initialState = () => {
  return Map({
    loading: {},
  });
};

export default handleActions(reducers, initialState());
