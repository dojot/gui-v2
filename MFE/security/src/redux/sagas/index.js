import { all } from 'redux-saga/effects';

import { certificatesSaga } from './certificatesSaga';
import { certificationAuthoritySaga } from './certificationAuthoritiesSaga';
import { deviceSaga } from './devicesSaga';

export default function* sagas() {
  yield all([
    ...deviceSaga,
    ...certificationAuthoritySaga,
    ...certificatesSaga,
  ]);
}
