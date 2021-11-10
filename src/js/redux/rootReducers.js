import { combineReducers } from 'redux';

import {
  base,
  certificationAuthorities,
  dashboard,
  devices,
  example,
  loading,
  templateAttrs,
  templates,
} from './modules';

export default combineReducers({
  base,
  certificationAuthorities,
  dashboard,
  devices,
  example,
  loading,
  templateAttrs,
  templates,
});
