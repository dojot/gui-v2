import { combineReducers } from 'redux'
import example from './modules/example'
import base from './modules/base'
import devices from './modules/devices'

export default combineReducers({
  example, base, devices,
})
