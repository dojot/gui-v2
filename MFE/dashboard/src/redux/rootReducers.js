import { combineReducers } from 'redux';

import {
    base,
    dashboard,
} from './modules';

export default combineReducers({
    base,
    dashboard,
});
