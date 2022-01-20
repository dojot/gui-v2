import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const SHOW_SUCCESS_TOAST = 'app/success/SHOW_SUCCESS_TOAST';
const HIDE_SUCCESS_TOAST = 'app/success/HIDE_SUCCESS_TOAST';

export const constants = {
  SHOW_SUCCESS_TOAST,
  HIDE_SUCCESS_TOAST,
};

export const showSuccessToast = createAction(
  SHOW_SUCCESS_TOAST,
  ({ i18nMessage, duration = 5000 }) => ({
    isShowing: true,
    i18nMessage,
    duration,
  }),
);

export const hideSuccessToast = createAction(HIDE_SUCCESS_TOAST);

export const actions = {
  showSuccessToast,
  hideSuccessToast,
};

export const reducers = {
  [SHOW_SUCCESS_TOAST]: (state, { payload }) => {
    return state.set('successToast', payload);
  },
  [HIDE_SUCCESS_TOAST]: state => {
    return state.mergeDeep({ successToast: { isShowing: false } });
  },
};

export const initialState = () => {
  return Map({
    successToast: {
      isShowing: false,
      i18nMessage: '',
      duration: 0,
    },
  });
};

export default handleActions(reducers, initialState());
