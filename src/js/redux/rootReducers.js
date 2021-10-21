import { combineReducers } from 'redux';

import base from './modules/base';
import dashboard from './modules/dashboard';
import devices from './modules/devices';
import example from './modules/example';
import templateAttrs from './modules/templateAttrs';
import templates from './modules/templates';

export default combineReducers({
  example,
  base,
  devices,
  dashboard,
  templates,
  templateAttrs,
});
