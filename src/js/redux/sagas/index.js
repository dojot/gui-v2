import { all } from 'redux-saga/effects';

import { certificatesSaga } from './certificatesSaga';
import { certificationAuthoritySaga } from './certificationAuthoritiesSaga';
import { dashboardSaga } from './dashboardSaga';
import { deviceSaga } from './devicesSaga';
import { templateAttrsSaga } from './templateAttrsSaga';
import { templateSaga } from './templatesSaga';
import { userSaga } from './usersSaga';

export default function* sagas() {
  yield all([
    ...deviceSaga,
    ...dashboardSaga,
    ...templateSaga,
    ...templateAttrsSaga,
    ...certificationAuthoritySaga,
    ...certificatesSaga,
    ...userSaga,
  ]);
}
