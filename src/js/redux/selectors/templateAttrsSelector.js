import { createSelector } from 'reselect';

export const attrsSelector = createSelector(
  state => state.templateAttrs,
  map => map.get('attrs'),
);

export const loadingTemplateAttrsSelector = createSelector(
  state => state.templateAttrs,
  map => map.get('loading'),
);

export const paginationControlSelector = createSelector(
  state => state.templateAttrs,
  map => map.get('paginationControl'),
);
