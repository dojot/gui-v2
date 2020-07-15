import { combineReducers } from 'redux';
import base from './modules/base';
import devices from './modules/devices';
import dashboard from './modules/dashboard';
import authentication from './modules/authentication';

export default combineReducers({
  base,
  devices,
  dashboard,
  authentication,
});
