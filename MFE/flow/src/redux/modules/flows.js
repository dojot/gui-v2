import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { compareAll } from 'sharedComponents/Utils';

const CREATE_FLOW = 'app/flows/CREATE_FLOW';
const DELETE_FLOW = 'app/flows/DELETE_FLOW';
const DELETE_MULTIPLE_FLOWS = 'app/flows/DELETE_MULTIPLE_FLOWS';
const EDIT_FLOW = 'app/flows/EDIT_FLOW';
const GET_FLOWS = 'app/flows/GET_FLOWS';
const GET_FLOW_BY_ID = 'app/flows/GET_FLOW_BY_ID';
const GET_NODES = 'app/flows/GET_NODES';
const SET_FLOW = 'app/flows/SET_FLOW';
const SORT_FLOWS = 'app/flows/SORT_FLOWS';
const UPDATE_FLOW = 'app/flows/UPDATE_FLOW';
const UPDATE_NODES = 'app/flows/UPDATE_NODES';

export const constants = {
  CREATE_FLOW,
  DELETE_FLOW,
  DELETE_MULTIPLE_FLOWS,
  EDIT_FLOW,
  GET_FLOWS,
  GET_FLOW_BY_ID,
  GET_NODES,
  SET_FLOW,
  SORT_FLOWS,
  UPDATE_FLOW,
  UPDATE_NODES,
};

export const getNodes = createAction(GET_NODES);

export const getFlows = createAction(GET_FLOWS, payload => {
  return payload;
});

export const getFlowByID = createAction(GET_FLOW_BY_ID, payload => {
  return { ...payload };
});

export const updateFlow = createAction(UPDATE_FLOW, payload => {
  return payload;
});

export const updateNodes = createAction(UPDATE_NODES, payload => {
  return payload;
});

export const deleteFlow = createAction(DELETE_FLOW, payload => {
  return { ...payload };
});

export const editFlow = createAction(EDIT_FLOW, payload => {
  return { ...payload };
});

export const createFlow = createAction(CREATE_FLOW, payload => {
  return { ...payload };
});

export const setFlow = createAction(SET_FLOW, ({ flow, clear = false, ...otherProps }) => {
  if (clear) {
    return { selectedFlow: {} };
  }
  return {
    selectedFlow: { ...otherProps, flow: JSON.parse(flow) },
  };
});

export const sortFlows = createAction(SORT_FLOWS, (property, order, flows) => {
  flows.sort((a, b) => {
    return compareAll(a[property], b[property], order === 'asc' ? 1 : -1);
  });
  return { flows };
});

export const actions = {
  createFlow,
  deleteFlow,
  editFlow,
  getFlowByID,
  getFlows,
  getNodes,
  setFlow,
  sortFlows,
  updateFlow,
  updateNodes,
};

export const reducers = {
  [UPDATE_FLOW]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [UPDATE_NODES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [SET_FLOW]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [SORT_FLOWS]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    error: null,
    flows: {},
    selectedFlow: {},
  });
};

export default handleActions(reducers, initialState());
