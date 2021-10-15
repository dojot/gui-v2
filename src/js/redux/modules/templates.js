import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const LOADING = 'app/templates/LOADING';
const GET_TEMPLATES = 'app/templates/GET_TEMPLATES';
const UPDATE_TEMPLATES = 'app/templates/UPDATE_TEMPLATES';
const DELETE_TEMPLATE = 'app/templates/DELETE_TEMPLATE';
const DELETE_ALL_TEMPLATES = 'app/templates/DELETE_ALL_TEMPLATES';
const CREATE_TEMPLATE = 'app/templates/CREATE_TEMPLATE';
const DUPLICATE_TEMPLATE = 'app/templates/DUPLICATE_TEMPLATE';

export const constants = {
  LOADING,
  GET_TEMPLATES,
  UPDATE_TEMPLATES,
  DELETE_TEMPLATE,
  DELETE_ALL_TEMPLATES,
  CREATE_TEMPLATE,
  DUPLICATE_TEMPLATE,
};

export const getTemplates = createAction(GET_TEMPLATES, payload => ({
  page: payload.page,
  filter: payload.filter,
}));

export const updateTemplates = createAction(UPDATE_TEMPLATES, payload => ({
  templates: payload.templates,
  paginationControl: {
    totalPages: payload.totalPages,
    currentPage: payload.currentPage,
  },
}));

export const setLoadingTemplates = createAction(LOADING, payload => ({
  loading: payload,
}));

export const deleteTemplate = createAction(DELETE_TEMPLATE, payload => ({
  templateId: payload.templateId,
}));

export const deleteMultipleTemplates = createAction(DELETE_ALL_TEMPLATES, payload => ({
  templateIdArray: payload.templateIdArray,
}));

export const createTemplate = createAction(CREATE_TEMPLATE, payload => ({
  name: payload.templateName,
  attrs: payload.attrs,
}));

export const duplicateTemplate = createAction(DUPLICATE_TEMPLATE, payload => ({
  templateId: payload.templateId,
}));

export const actions = {
  getTemplates,
  updateTemplates,
  setLoadingTemplates,
  deleteTemplate,
  deleteMultipleTemplates,
  createTemplate,
  duplicateTemplate,
};

export const reducers = {
  [UPDATE_TEMPLATES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    templates: [],
    loading: false,
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });
};

export default handleActions(reducers, initialState());
