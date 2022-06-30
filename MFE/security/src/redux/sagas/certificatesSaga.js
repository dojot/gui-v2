import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { paginationControlSelector } from '../selectors/certificatesSelector';
import { Certificates } from '../../adapters/services';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';

import { constants, actions } from '../modules/certificates';
import { actions as loadingActions } from '../modules/loading';

export function* getCurrentCertificatesPageAgain() {
  const pagination = yield select(paginationControlSelector);
  yield put(
    actions.getCertificates({
      page: {
        number: pagination.currentPage,
        size: pagination.itemsPerPage,
      },
    }),
  );
}

export function* handleGetCertificates(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_CERTIFICATES));
    const { page, filter } = action.payload;
    const { getCertificateList } = yield call(Certificates.getCertificateList, page, filter);
    if (getCertificateList) {
      yield put(
        actions.updateCertificates({
          certificates: getCertificateList.certificates,
          paginationControl: {
            currentPage: getCertificateList.pagination.currentPage,
            totalPages: getCertificateList.pagination.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCertificates({ certificates: [] }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "getCertificates",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATES));
  }
}

export function* handleGetCertificateById(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_ID));
    const { page, filter, id } = action.payload;
    const { getCertificateById } = yield call(Certificates.getCertificate, page, filter, id);
    if (getCertificateById) {
      yield put(
        actions.updateCertificates({
          certificates: getCertificateById.certificates,
          paginationControl: {
            currentPage: getCertificateById.pagination.currentPage,
            totalPages: getCertificateById.pagination.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCertificates({ certificates: [] }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "getCertificates",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_ID));
  }
}

export function* handleGetCertificateByFingerprint(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT));
    const { fingerprint } = action.payload;
    const { getCertificateByFingerprint } = yield call(
      Certificates.getCertificateByFingerprint,
      fingerprint,
    );
    if (getCertificateByFingerprint) {
      yield put(
        actions.setCertificateDetails({
          certificateDetails: getCertificateByFingerprint,
        }),
      );
    }
  } catch (e) {
    yield put(actions.setCertificateDetails({ certificateDetails: null }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "getCertificateByFingerprint",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT));
  }
}

export function* handleDeleteCertificate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_CERTIFICATE));
    const { fingerprint, successCallback } = action.payload;
    yield call(Certificates.deleteMultipleCertificates, [fingerprint]);
    if (successCallback) yield call(successCallback);
    yield call(getCurrentCertificatesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "deleteCertificate", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "deleteCertificate",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_CERTIFICATE));
  }
}

export function* handleDeleteMultipleCertificates(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATES));
    const { fingerprints } = action.payload;
    yield call(Certificates.deleteMultipleCertificates, fingerprints);
    yield call(getCurrentCertificatesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "deleteMultipleCertificates", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "deleteMultipleCertificates",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATES));
  }
}

export function* handleDisassociateDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.DISASSOCIATE_DEVICE));
    const { fingerprint } = action.payload;
    yield call(Certificates.disassociateDevice, fingerprint);
    yield call(getCurrentCertificatesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "disassociateDevice", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "disassociateDevice",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DISASSOCIATE_DEVICE));
  }
}

export function* handleAssociateDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.ASSOCIATE_DEVICE));
    const { fingerprint, deviceId } = action.payload;
    yield call(Certificates.associateDevice, fingerprint, deviceId);
    yield call(getCurrentCertificatesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "associateDevice", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "associateDevice",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.ASSOCIATE_DEVICE));
  }
}

export function* handleCreateCertificateOneClick(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_ONE_CLICK));
    const { commonName, successCallback, shouldGetCurrentPageAgain } = action.payload;
    const { createCertificateOneClick } = yield call(
      Certificates.createCertificateOneClick,
      commonName,
    );
    if (successCallback) yield call(successCallback, createCertificateOneClick);
    if (shouldGetCurrentPageAgain) yield call(getCurrentCertificatesPageAgain);
    yield put(actions.getNewGeneratedCertificate({ certificateData: createCertificateOneClick }));
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "createCertificate", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "createCertificate",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_ONE_CLICK));
  }
}

export function* handleCreateCertificateCSR(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_CSR));
    const { csrPEM } = action.payload;
    const { createCertificateCSR } = yield call(Certificates.createCertificateCSR, csrPEM);
    yield put(actions.getNewGeneratedCertificate({ certificateData: createCertificateCSR }));
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "createCertificate", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "createCertificate",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_CSR));
  }
}

export function* handleRegisterExternalCertificate(action) {
  try {
    yield put(loadingActions.addLoading(constants.REGISTER_EXTERNAL_CERTIFICATE));
    const { certificateChain } = action.payload;
    const { registerExternalCertificate } = yield call(
      Certificates.registerExternalCertificate,
      certificateChain,
    );
    yield put(actions.getNewGeneratedCertificate({ certificateData: registerExternalCertificate }));
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "addedCertificate", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "createCertificate",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.REGISTER_EXTERNAL_CERTIFICATE));
  }
}

export function* watchGetCertificates() {
  yield takeLatest(constants.GET_CERTIFICATES, handleGetCertificates);
}

export function* watchGetCertificateById() {
  yield takeLatest(constants.GET_CERTIFICATES_BY_ID, handleGetCertificateById);
}

export function* watchGetCertificateByFingerprint() {
  yield takeLatest(constants.GET_CERTIFICATES_BY_FINGERPRINT, handleGetCertificateByFingerprint);
}

export function* watchDeleteCertificate() {
  yield takeLatest(constants.DELETE_CERTIFICATE, handleDeleteCertificate);
}

export function* watchDeleteMultipleCertificates() {
  yield takeLatest(constants.DELETE_MULTIPLE_CERTIFICATES, handleDeleteMultipleCertificates);
}

export function* watchDisassociateDevice() {
  yield takeLatest(constants.DISASSOCIATE_DEVICE, handleDisassociateDevice);
}

export function* watchAssociateDevice() {
  yield takeLatest(constants.ASSOCIATE_DEVICE, handleAssociateDevice);
}

export function* watchCreateCertificateOneClick() {
  yield takeLatest(constants.CREATE_CERTIFICATE_ONE_CLICK, handleCreateCertificateOneClick);
}

export function* watchCreateCertificateCSR() {
  yield takeLatest(constants.CREATE_CERTIFICATE_CSR, handleCreateCertificateCSR);
}

export function* watchRegisterExternalCertificate() {
  yield takeLatest(constants.REGISTER_EXTERNAL_CERTIFICATE, handleRegisterExternalCertificate);
}

export const certificatesSaga = [
  fork(watchGetCertificates),
  fork(watchGetCertificateById),
  fork(watchGetCertificateByFingerprint),
  fork(watchDeleteCertificate),
  fork(watchDeleteMultipleCertificates),
  fork(watchDisassociateDevice),
  fork(watchAssociateDevice),
  fork(watchCreateCertificateOneClick),
  fork(watchCreateCertificateCSR),
  fork(watchRegisterExternalCertificate),
];
