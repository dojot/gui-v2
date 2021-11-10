import { combineReducers } from 'redux';

import {
  base,
  certificationAuthorities,
  dashboard,
  devices,
  errors,
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
  errors,
  example,
  loading,
  templateAttrs,
  templates,
});
