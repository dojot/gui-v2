import { put, fork, takeLatest } from 'redux-saga/effects';
import { constants, actions } from 'Redux/security';
import { Security } from 'Services';

export function* handleGetCertificates(action) {
  try {
    yield put(actions.setLoading(true));
    const { page } = action.payload;
    const { getCertificates } = yield Security.getCertificateList(page);
    if (getCertificates) yield put(actions.updateCertificate(getCertificates));
  } catch (e) {
    yield put(actions.updateCertificate({ certificates: [] }));
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* handleDetachCertificate(action) {
  try {
    const { certificateId } = action.payload;
    yield Security.detachCertificate(certificateId);
  } catch (e) {
    console.error(e.message);
  }
}

export function* handleAttachCertificate(action) {
  try {
    const { deviceId, certificateId } = action.payload;
    yield Security.attachCertificate(certificateId, deviceId);
  } catch (e) {
    console.error(e.message);
  }
}

// TODO
// export function* handleOneClickCreation(action) {
//   try {
//   } catch (e) {
//     console.error(e.message);
//   }
// }

function* watchGetCertificates() {
  yield takeLatest(constants.GET_CERTIFICATES, handleGetCertificates);
}

function* watchAttachCertificate() {
  yield takeLatest(constants.ATTACH_CERTIFICATE, handleAttachCertificate);
}

function* watchDetachCertificate() {
  yield takeLatest(constants.DETACH_CERTIFICATE, handleDetachCertificate);
}

// function* watchOneClickCreation() {
//   yield takeLatest(constants.CREATE_ON_CLICK_CERTIFICATE, handleOneClickCreation);
// }

export const securitySaga = [
  fork(watchGetCertificates),
  fork(watchAttachCertificate),
  fork(watchDetachCertificate),
  // fork(watchOneClickCreation),
];
