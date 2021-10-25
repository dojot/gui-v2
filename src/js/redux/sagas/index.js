import { all } from 'redux-saga/effects';

import { certificatesSaga } from './certificatesSaga';
import { certificationAuthoritySaga } from './certificationAuthoritiesSaga';
import { dashboardSaga } from './dashboardSaga';
import { deviceSaga } from './devicesSaga';
import { exampleSaga } from './exampleSaga';
import { securitySaga } from './securitySaga';
import { templateAttrsSaga } from './templateAttrsSaga';
import { templateSaga } from './templatesSaga';

export default function* sagas() {
  yield all([
    ...exampleSaga,
    ...deviceSaga,
    ...dashboardSaga,
    ...templateSaga,
    ...templateAttrsSaga,
    ...securitySaga,
    ...certificationAuthoritySaga,
    ...certificatesSaga,
  ]);
}
