import { createSelector } from 'reselect';

const baseDataSelector = state => state.base;

const getMenuSelector = createSelector(baseDataSelector, payload =>
  payload.get('isMenuOpen'),
);
const getTitleSelector = createSelector(baseDataSelector, payload =>
  payload.get('headerTitle'),
);

export const menuSelector = state => ({
  isMenuOpen: getMenuSelector(state),
});

export const titleSelector = state => ({
  headerTitle: getTitleSelector(state),
});
