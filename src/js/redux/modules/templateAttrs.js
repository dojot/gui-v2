import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const LOADING = 'app/templateAttrs/LOADING';
const GET_ATTRS = 'app/templateAttrs/GET_ATTRS';
const UPDATE_ATTRS = 'app/templateAttrs/UPDATE_ATTRS';
const DELETE_ATTR = 'app/templateAttrs/DELETE_ATTR';
const DELETE_ALL_ATTRS = 'app/templateAttrs/DELETE_ALL_ATTRS';
const CREATE_ATTR = 'app/templateAttrs/CREATE_ATTR';

export const constants = {
  LOADING,
  GET_ATTRS,
  UPDATE_ATTRS,
  DELETE_ATTR,
  DELETE_ALL_ATTRS,
  CREATE_ATTR,
};

export const getAttrs = createAction(GET_ATTRS, payload => ({
  templateId: payload.templateId,
  page: payload.page,
  filter: payload.filter,
}));

export const updateAttrs = createAction(UPDATE_ATTRS, payload => ({
  attrs: payload.attrs,
  paginationControl: {
    totalPages: payload.totalPages,
    currentPage: payload.currentPage,
  },
}));

export const setLoadingAttrs = createAction(LOADING, payload => ({
  loading: payload,
}));

export const deleteAttr = createAction(DELETE_ATTR, payload => ({
  templateId: payload.templateId,
  attrId: payload.attrId,
}));

export const deleteMultipleAttrs = createAction(DELETE_ALL_ATTRS, payload => ({
  templateId: payload.templateId,
  attrIdArray: payload.attrIdArray,
}));

export const createAttr = createAction(CREATE_ATTR, payload => ({
  templateId: payload.templateId,
  name: payload.name,
  type: payload.type,
  valueType: payload.valueType,
  value: payload.value,
}));

export const actions = {
  getAttrs,
  updateAttrs,
  setLoadingAttrs,
  deleteAttr,
  deleteMultipleAttrs,
  createAttr,
};

export const reducers = {
  [UPDATE_ATTRS]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    attrs: [],
    loading: false,
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });
};

export default handleActions(reducers, initialState());
