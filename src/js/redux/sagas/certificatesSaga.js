import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { constants, actions } from 'Redux/certificates';
import { paginationControlSelector } from 'Selectors/certificatesSelector';
import { Certificates } from 'Services';

import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';

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

export function* getOnlyNewCertificate(fingerprint, privateKeyPEM, publicKeyPEM) {
  yield put(
    actions.getCertificateByFingerprint({
      fingerprint,
      privateKeyPEM,
      publicKeyPEM,
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
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getCertificates',
      }),
    );
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
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getCertificates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_ID));
  }
}

export function* handleGetCertificateByFingerprint(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT));
    const { fingerprint, privateKey, publicKey } = action.payload;
    const { getCertificateByFingerprint } = yield call(
      Certificates.getCertificateByFingerprint,
      fingerprint,
    );
    if (getCertificateByFingerprint) {
      yield put(
        actions.updateCertificates({
          certificates: [{ ...getCertificateByFingerprint, privateKey, publicKey }],
          paginationControl: {
            currentPage: 1,
            totalPages: 1,
            itemsPerPage: 1,
          },
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCertificates({ certificates: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getCertificates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_ID));
  }
}

export function* handleDeleteCertificate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_CERTIFICATE));
    const { fingerprint } = action.payload;
    yield call(Certificates.deleteMultipleCertificates, [fingerprint]);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteCertificate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteCertificate',
      }),
    );
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
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleCertificates' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleCertificates',
      }),
    );
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
    yield put(successActions.showSuccessToast({ i18nMessage: 'disassociateDevice' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'disassociateDevice',
      }),
    );
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
    yield put(successActions.showSuccessToast({ i18nMessage: 'associateDevice' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'associateDevice',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.ASSOCIATE_DEVICE));
  }
}

export function* handleCreateOneClickCertificate(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_ONE_CLICK));
    const { commonName } = action.payload;
    const {
      createCertificate: { certificateFingerprint, privateKeyPEM, publicKeyPEM },
    } = yield call(Certificates.createOneClickCertificate, commonName);
    yield call(getOnlyNewCertificate, certificateFingerprint, privateKeyPEM, publicKeyPEM);
    yield put(successActions.showSuccessToast({ i18nMessage: 'createCertificate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'createCertificate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_ONE_CLICK));
  }
}

function* watchGetCertificates() {
  yield takeLatest(constants.GET_CERTIFICATES, handleGetCertificates);
}

function* watchCreateOneClickCertificate() {
  yield takeLatest(constants.CREATE_ONE_CLICK, handleCreateOneClickCertificate);
}

function* watchGetCertificateById() {
  yield takeLatest(constants.GET_CERTIFICATES_BY_ID, handleGetCertificateById);
}

function* watchGetCertificateByFingerprint() {
  yield takeLatest(constants.GET_CERTIFICATES_BY_FINGERPRINT, handleGetCertificateByFingerprint);
}

function* watchDeleteCertificate() {
  yield takeLatest(constants.DELETE_CERTIFICATE, handleDeleteCertificate);
}

function* watchDeleteMultipleCertificates() {
  yield takeLatest(constants.DELETE_MULTIPLE_CERTIFICATES, handleDeleteMultipleCertificates);
}

function* watchDisassociateDevice() {
  yield takeLatest(constants.DISASSOCIATE_DEVICE, handleDisassociateDevice);
}

function* watchAssociateDevice() {
  yield takeLatest(constants.ASSOCIATE_DEVICE, handleAssociateDevice);
}

export const certificatesSaga = [
  fork(watchGetCertificates),
  fork(watchCreateOneClickCertificate),
  fork(watchGetCertificateById),
  fork(watchGetCertificateByFingerprint),
  fork(watchDeleteCertificate),
  fork(watchDeleteMultipleCertificates),
  fork(watchDisassociateDevice),
  fork(watchAssociateDevice),
];
