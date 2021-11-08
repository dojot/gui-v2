import { combineReducers } from 'redux';

import base from './modules/base';
import certificationAuthorities from './modules/certificationAuthorities';
import dashboard from './modules/dashboard';
import devices from './modules/devices';
import example from './modules/example';
import templateAttrs from './modules/templateAttrs';
import templates from './modules/templates';

export default combineReducers({
  example,
  base,
  devices,
  certificationAuthorities,
  dashboard,
  templates,
  templateAttrs,
});
