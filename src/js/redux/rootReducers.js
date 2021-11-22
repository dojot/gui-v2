import { combineReducers } from 'redux';

import {
  base,
  certificates,
  certificationAuthorities,
  dashboard,
  devices,
  errors,
  example,
  loading,
  success,
  templateAttrs,
  templates,
} from './modules';

export default combineReducers({
  base,
  certificates,
  certificationAuthorities,
  dashboard,
  devices,
  errors,
  example,
  loading,
  success,
  templateAttrs,
  templates,
});
