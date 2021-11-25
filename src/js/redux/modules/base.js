import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const UPDATE_MENU_STATE = 'app/base/UPDATE_MENU_STATE';
const UPDATE_HEADER_TITLE = 'app/base/UPDATE_HEADER_TITLE';

export const constants = {
  UPDATE_MENU_STATE,
  UPDATE_HEADER_TITLE,
};

export const updateIsMenuOpen = createAction(UPDATE_MENU_STATE, isMenuOpen => ({
  isMenuOpen,
}));

export const updateHeaderTitle = createAction(UPDATE_HEADER_TITLE, headerTitle => ({
  headerTitle,
}));

export const actions = {
  updateIsMenuOpen,
  updateHeaderTitle,
};

export const reducers = {
  [UPDATE_MENU_STATE]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
  [UPDATE_HEADER_TITLE]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
};

export const initialState = () =>
  Map({
    isMenuOpen: false,
    headerTitle: '',
  });

export default handleActions(reducers, initialState());
