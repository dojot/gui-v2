import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

// import type { baseType } from '../../common/types/example'

const UPDATE_MENU_STATE = 'app/example/UPDATE_EXAMPLE'

export const constants = {
  UPDATE_MENU_STATE,
}

// ------------------------------------
// Actions
// ------------------------------------
export const updateIsMenuOpen = createAction(
  UPDATE_MENU_STATE,
  (isMenuOpen: bool) => ({ isMenuOpen })
)

export const actions = {
  updateIsMenuOpen,
}

export const reducers = {
  [UPDATE_MENU_STATE]: (state, { payload }) => state.merge({
    ...payload,
  }),
}

export const initialState = () => Map({
  isMenuOpen: false,
})

export default handleActions(reducers, initialState())
