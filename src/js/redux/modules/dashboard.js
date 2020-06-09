import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

import type { exampleType } from '../../common/types/example'

const START_POLLING = 'app/dashboard/START_POLLING'
const STOP_POLLING = 'app/dashboard/STOP_POLLING'
const UPDATE_VALUES = 'app/dashboard/UPDATE_VALUES'
const ERROR_POLLING = 'app/dashboard/ERROR_POLLING'

export const constants = {
  START_POLLING,
  STOP_POLLING,
  UPDATE_VALUES,
  ERROR_POLLING,
}

// ------------------------------------
// Actions
// ------------------------------------
export const startPolling = createAction(START_POLLING, () => ({}))
export const stopPolling = createAction(STOP_POLLING, () => ({}))
export const errorPolling = createAction(ERROR_POLLING, () => ({}))
export const updateValues = createAction(
  UPDATE_VALUES,
  (result) => ({ result })
)

export const actions = {
  startPolling,
  stopPolling,
  updateValues,
  errorPolling,
}

export const reducers = {
  [UPDATE_VALUES]: (state, { payload }) => state.merge({
    ...payload,
  }),
}

export const initialState = () => Map({
  result: '',
})

export default handleActions(reducers, initialState())
