import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const DELETE_ATTR = 'app/templateAttrs/DELETE_ATTR';
const DELETE_MULTIPLE_ATTRS = 'app/templateAttrs/DELETE_MULTIPLE_ATTRS';
const CREATE_ATTR = 'app/templateAttrs/CREATE_ATTR';
const EDIT_ATTR = 'app/templateAttrs/EDIT_ATTR';

export const constants = {
  DELETE_ATTR,
  DELETE_MULTIPLE_ATTRS,
  CREATE_ATTR,
  EDIT_ATTR,
};

export const deleteAttr = createAction(DELETE_ATTR, payload => ({
  templateId: payload.templateId,
  attrId: payload.attrId,
  successCallback: payload.successCallback,
}));

export const deleteMultipleAttrs = createAction(DELETE_MULTIPLE_ATTRS, payload => ({
  templateId: payload.templateId,
  attrIds: payload.attrIds,
  successCallback: payload.successCallback,
}));

export const createAttr = createAction(CREATE_ATTR, payload => ({
  templateId: payload.templateId,
  attr: payload.attr,
  successCallback: payload.successCallback,
}));

export const editAttr = createAction(EDIT_ATTR, payload => ({
  templateId: payload.templateId,
  attrId: payload.attrId,
  attr: payload.attr,
  successCallback: payload.successCallback,
}));

export const actions = {
  deleteAttr,
  deleteMultipleAttrs,
  createAttr,
  editAttr,
};

export const reducers = {};

export const initialState = () => {
  return Map({});
};

export default handleActions(reducers, initialState());
