import { combineReducers } from 'redux'
import example from './modules/example'
import base from './modules/base'

export default combineReducers({
  example, base,
})
