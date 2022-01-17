import { combineReducers } from 'redux';

import {
  base,
  certificates,
  certificationAuthorities,
  dashboard,
  devices,
  errors,
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
  loading,
  success,
  templateAttrs,
  templates,
});
