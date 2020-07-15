import { createSelector } from 'reselect';

const authenticationDataSelector = state => state.authentication;

const getLoginError = createSelector(authenticationDataSelector, payload =>
  payload.get('error'),
);
const getHasToken = createSelector(authenticationDataSelector, payload =>
  payload.get('hasToken'),
);

export const errorSelector = state => ({
  error: getLoginError(state),
});

export const hasTokenSelector = state => ({
  hasToken: getHasToken(state),
});
