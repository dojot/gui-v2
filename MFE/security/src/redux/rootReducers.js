import { combineReducers } from 'redux';

import {
  certificates,
  certificationAuthorities,
  devices,
  loading,
} from './modules';

export default combineReducers({
  certificates,
  certificationAuthorities,
  devices,
  loading,
});
