import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

import type { exampleType } from '../../common/types/example'

const maxPush = (arr, value, max) => {
  if (arr.length >= max) {
    arr.splice(0, arr.length - max + 1);
  }
  return arr.concat(value);
}

const START_POLLING = 'app/dashboard/START_POLLING'
const STOP_POLLING = 'app/dashboard/STOP_POLLING'
const SET_INTERVAL = 'app/dashboard/SET_INTERVAL'
const UPDATE_VALUES = 'app/dashboard/UPDATE_VALUES'
const ERROR_POLLING = 'app/dashboard/ERROR_POLLING'
const ADD_WIDGET = 'app/dashboard/ADD_WIDGET'
const REMOVE_WIDGET = 'app/dashboard/REMOVE_WIDGET'
const GET_LAYOUT = 'app/dashboard/GET_LAYOUT'
const UPDATE_LAYOUT = 'app/dashboard/UPDATE_LAYOUT'
const INIT_LAYOUT = 'app/dashboard/INIT_LAYOUT'

export const constants = {
  START_POLLING,
  STOP_POLLING,
  SET_INTERVAL,
  UPDATE_VALUES,
  ERROR_POLLING,
  ADD_WIDGET,
  REMOVE_WIDGET,
  GET_LAYOUT,
  UPDATE_LAYOUT,
  INIT_LAYOUT,
}

// ------------------------------------
// Actions
// ------------------------------------
export const startPolling = createAction(START_POLLING, () => ({}))
export const stopPolling = createAction(STOP_POLLING, () => ({}))
export const setInterval = createAction(SET_INTERVAL, () => ({}))
export const errorPolling = createAction(ERROR_POLLING, () => ({}))
export const updateValues = createAction(
  UPDATE_VALUES,
  (data) => (data)
)
export const addWidget = createAction(ADD_WIDGET, () => ({}))
export const removeWidget = createAction(REMOVE_WIDGET, () => ({}))
export const getLayout = createAction(GET_LAYOUT, (layout) => ({ layout }))
export const updateLayout = createAction(UPDATE_LAYOUT, (layout) => ({ layout }))
export const initLayout = createAction(INIT_LAYOUT, (layout) => ({ layout }))

export const actions = {
  startPolling,
  stopPolling,
  setInterval,
  updateValues,
  errorPolling,
  addWidget,
  removeWidget,
  getLayout,
  updateLayout,
  initLayout,
}

export const reducers = {
  [UPDATE_VALUES]: (state, { payload }) => {
    console.log(payload)
    return state.update('data', (data) => {
      const result = maxPush(data, payload, 15)
      console.log(result)
      return result;
    })
  },

  [UPDATE_LAYOUT]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [ADD_WIDGET]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [INIT_LAYOUT]: (state, { payload }) => state.merge({
    ...payload,
  }),
}

export const initialState = () => Map({
  data: [],
  layout: [],
  configs: [],
})

export default handleActions(reducers, initialState())
