import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_TEMPLATES = 'app/templates/GET_TEMPLATES';
const GET_TEMPLATE_BY_ID = 'app/templates/GET_TEMPLATE_BY_ID';
const UPDATE_TEMPLATES = 'app/templates/UPDATE_TEMPLATES';
const DELETE_TEMPLATE = 'app/templates/DELETE_TEMPLATE';
const DELETE_MULTIPLE_TEMPLATES = 'app/templates/DELETE_MULTIPLE_TEMPLATES';
const CREATE_TEMPLATE = 'app/templates/CREATE_TEMPLATE';
const DUPLICATE_TEMPLATE = 'app/templates/DUPLICATE_TEMPLATE';
const EDIT_TEMPLATE = 'app/templates/EDIT_TEMPLATE';

export const constants = {
  GET_TEMPLATES,
  GET_TEMPLATE_BY_ID,
  UPDATE_TEMPLATES,
  DELETE_TEMPLATE,
  DELETE_MULTIPLE_TEMPLATES,
  CREATE_TEMPLATE,
  DUPLICATE_TEMPLATE,
  EDIT_TEMPLATE,
};

export const getTemplates = createAction(GET_TEMPLATES, payload => ({
  page: payload.page,
  filter: payload.filter,
  sortBy: payload.sortBy,
}));

export const getTemplateById = createAction(GET_TEMPLATE_BY_ID, payload => ({
  templateId: payload.templateId,
}));

export const updateTemplates = createAction(UPDATE_TEMPLATES, payload => {
  const actionPayload = {
    templates: payload.templates,
    templateData: payload.templateData,
    paginationControl: payload.paginationControl,
  };

  // If some attribute is undefined it will be removed from the state
  // So, its necessary to remove all undefined values from the payload
  Object.entries(actionPayload).forEach(([key, value]) => {
    if (value === undefined) delete actionPayload[key];
  });

  return actionPayload;
});

export const deleteTemplate = createAction(DELETE_TEMPLATE, payload => ({
  templateId: payload.templateId,
}));

export const deleteMultipleTemplates = createAction(DELETE_MULTIPLE_TEMPLATES, payload => ({
  templateIds: payload.templateIds,
  failCallback: payload.failCallback,
}));

export const createTemplate = createAction(CREATE_TEMPLATE, payload => ({
  label: payload.label,
  attrs: payload.attrs,
  successCallback: payload.successCallback,
}));

export const duplicateTemplate = createAction(DUPLICATE_TEMPLATE, payload => ({
  templateId: payload.templateId,
}));

export const editTemplate = createAction(EDIT_TEMPLATE, payload => ({
  id: payload.id,
  label: payload.label,
  attrs: payload.attrs,
  successCallback: payload.successCallback,
}));

export const actions = {
  getTemplates,
  getTemplateById,
  updateTemplates,
  deleteTemplate,
  deleteMultipleTemplates,
  createTemplate,
  duplicateTemplate,
  editTemplate,
};

export const reducers = {
  [UPDATE_TEMPLATES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    templates: [],
    templateData: null,
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 0,
    },
  });
};

export default handleActions(reducers, initialState());
