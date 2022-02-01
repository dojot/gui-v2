import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { Certificates } from 'Services';

import { constants, actions } from '../../modules/certificates';
import { actions as errorActions } from '../../modules/errors';
import { actions as loadingActions } from '../../modules/loading';
import { actions as successActions } from '../../modules/success';
import { paginationControlSelector } from '../../selectors/certificatesSelector';
import {
  certificatesSaga,
  getCurrentCertificatesPageAgain,
  handleCreateCertificateCSR,
  handleGetCertificates,
  handleDeleteCertificate,
  handleDeleteMultipleCertificates,
  handleGetCertificateByFingerprint,
  handleGetCertificateById,
  handleDisassociateDevice,
  handleAssociateDevice,
  handleCreateCertificateOneClick,
  handleRegisterExternalCertificate,
  watchGetCertificates,
  watchGetCertificateById,
  watchGetCertificateByFingerprint,
  watchDeleteCertificate,
  watchDeleteMultipleCertificates,
  watchDisassociateDevice,
  watchAssociateDevice,
  watchCreateCertificateOneClick,
  watchCreateCertificateCSR,
  watchRegisterExternalCertificate,
} from '../certificatesSaga';

describe('certificatesSaga', () => {
  beforeAll(() => {
    // Using fake timers because errorActions.addError uses Date.now()
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.now());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeCertificate = {
    fingerprint: 'fingerprint',
    autoRegistered: false,
    belongsTo: { device: 'deviceId' },
    createdAt: 'createdAt',
    modifiedAt: 'modifiedAt',
    pem: 'pem',
    subjectDN: 'subjectDN',
    tenant: 'tenant',
    validity: {
      notBefore: 'notBefore',
      notAfter: 'notAfter',
    },
  };

  it('should get the current page of certificates again', async () => {
    const selectPagination = matchers.select(paginationControlSelector);

    const pagination = {
      currentPage: 1,
      itemsPerPage: 10,
    };

    return expectSaga(getCurrentCertificatesPageAgain)
      .provide([[selectPagination, pagination]])
      .select(paginationControlSelector)
      .put(
        actions.getCertificates({
          page: {
            number: pagination.currentPage,
            size: pagination.itemsPerPage,
          },
        }),
      )
      .run();
  });

  it('should get a list of certificates with pagination', async () => {
    const action = actions.getCertificates({
      page: { size: 10, number: 1 },
      filter: { fingerprint: fakeCertificate.fingerprint },
    });

    const apiRequest = matchers.call.fn(Certificates.getCertificateList);

    const responseData = {
      getCertificateList: {
        certificates: [fakeCertificate],
        pagination: {
          currentPage: 1,
          totalPages: 1,
        },
      },
    };

    return expectSaga(handleGetCertificates, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATES))
      .put(
        actions.updateCertificates({
          certificates: responseData.getCertificateList.certificates,
          paginationControl: {
            currentPage: responseData.getCertificateList.pagination.currentPage,
            totalPages: responseData.getCertificateList.pagination.totalPages,
            itemsPerPage: action.payload.page.size,
          },
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATES))
      .run();
  });

  it('should handle errors if fails to get certificates', async () => {
    const action = actions.getCertificates({
      page: { size: 10, number: 1 },
      filter: { fingerprint: 'fingerprint' },
    });

    const apiRequest = matchers.call.fn(Certificates.getCertificateList);

    return expectSaga(handleGetCertificates, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATES))
      .put(actions.updateCertificates({ certificates: [] }))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'getCertificates',
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATES))
      .run();
  });

  it('should get a certificate by id', async () => {
    const action = actions.getCertificateById({
      id: 'null',
      page: {
        number: 1,
        size: 10,
      },
      filter: {
        fingerprint: 'fingerprint',
      },
    });

    const apiRequest = matchers.call.fn(Certificates.getCertificate);

    const responseData = {
      getCertificateById: {
        pagination: {
          currentPage: 1,
          totalPages: 1,
        },
        certificates: [
          {
            subjectDN: fakeCertificate.subjectDN,
            fingerprint: fakeCertificate.fingerprint,
            pem: fakeCertificate.pem,
            validity: fakeCertificate.validity,
          },
        ],
      },
    };

    return expectSaga(handleGetCertificateById, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_ID))
      .put(
        actions.updateCertificates({
          certificates: responseData.getCertificateById.certificates,
          paginationControl: {
            currentPage: responseData.getCertificateById.pagination.currentPage,
            totalPages: responseData.getCertificateById.pagination.totalPages,
            itemsPerPage: action.payload.page.size,
          },
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_ID))
      .run();
  });

  it('should handle errors if fails to get a certificate by id', async () => {
    const action = actions.getCertificateById({
      id: 'null',
      page: {
        number: 1,
        size: 10,
      },
      filter: {
        fingerprint: 'fingerprint',
      },
    });

    const apiRequest = matchers.call.fn(Certificates.getCertificate);

    return expectSaga(handleGetCertificateById, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_ID))
      .put(
        actions.updateCertificates({
          certificates: [],
        }),
      )
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'getCertificates',
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_ID))
      .run();
  });

  it('should get a certificate by fingerprint', async () => {
    const action = actions.getCertificateByFingerprint({
      fingerprint: fakeCertificate.fingerprint,
    });

    const apiRequest = matchers.call.fn(Certificates.getCertificateByFingerprint);

    const responseData = {
      getCertificateByFingerprint: {
        subjectDN: fakeCertificate.subjectDN,
        fingerprint: fakeCertificate.fingerprint,
        pem: fakeCertificate.pem,
        validity: fakeCertificate.validity,
      },
    };

    return expectSaga(handleGetCertificateByFingerprint, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT))
      .put(
        actions.setCertificateDetails({
          certificateDetails: responseData.getCertificateByFingerprint,
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT))
      .run();
  });

  it('should handle errors if fails to get a certificate by fingerprint', async () => {
    const action = actions.getCertificateByFingerprint({
      fingerprint: fakeCertificate.fingerprint,
    });

    const apiRequest = matchers.call.fn(Certificates.getCertificateByFingerprint);

    return expectSaga(handleGetCertificateByFingerprint, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'getCertificateByFingerprint',
        }),
      )
      .put(
        actions.setCertificateDetails({
          certificateDetails: null,
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATES_BY_FINGERPRINT))
      .run();
  });

  it('should delete a certificate', async () => {
    const action = actions.deleteCertificate({
      fingerprint: fakeCertificate.fingerprint,
    });

    const apiRequest = matchers.call.fn(Certificates.deleteMultipleCertificates);

    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleDeleteCertificate, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_CERTIFICATE))
      .put(
        successActions.showSuccessToast({
          i18nMessage: 'deleteCertificate',
        }),
      )
      .put(loadingActions.removeLoading(constants.DELETE_CERTIFICATE))
      .run();
  });

  it('should handle errors if fails to delete a certificate', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteCertificate({
      successCallback,
      fingerprint: fakeCertificate.fingerprint,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(Certificates.deleteMultipleCertificates);

    return expectSaga(handleDeleteCertificate, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_CERTIFICATE))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'deleteCertificate',
        }),
      )
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_CERTIFICATE))
      .run();
  });

  it('should delete multiple certificates', async () => {
    const action = actions.deleteMultipleCertificates({
      fingerprints: [fakeCertificate.fingerprint],
    });

    const apiRequest = matchers.call.fn(Certificates.deleteMultipleCertificates);
    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleDeleteMultipleCertificates, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATES))
      .put(
        successActions.showSuccessToast({
          i18nMessage: 'deleteMultipleCertificates',
        }),
      )
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATES))
      .run();
  });

  it('should handle errors if fails to delete multiple certificates', async () => {
    const action = actions.deleteMultipleCertificates({
      fingerprints: [fakeCertificate.fingerprint],
    });

    const apiRequest = matchers.call.fn(Certificates.deleteMultipleCertificates);
    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleDeleteMultipleCertificates, action)
      .provide([
        [apiRequest, throwError(new Error('Failed'))],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATES))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'deleteMultipleCertificates',
        }),
      )
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATES))
      .run();
  });

  it('should disassociate a device of a certificate', async () => {
    const action = actions.disassociateDevice({ fingerprint: fakeCertificate.fingerprint });

    const apiRequest = matchers.call.fn(Certificates.disassociateDevice);

    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleDisassociateDevice, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DISASSOCIATE_DEVICE))
      .put(successActions.showSuccessToast({ i18nMessage: 'disassociateDevice' }))
      .put(loadingActions.removeLoading(constants.DISASSOCIATE_DEVICE))
      .run();
  });

  it('should handle errors if fails to disassociate a device of a certificate', async () => {
    const action = actions.disassociateDevice({ fingerprint: fakeCertificate.fingerprint });

    const apiRequest = matchers.call.fn(Certificates.disassociateDevice);

    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleDisassociateDevice, action)
      .provide([
        [apiRequest, throwError(new Error('Failed'))],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DISASSOCIATE_DEVICE))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'disassociateDevice',
        }),
      )
      .put(loadingActions.removeLoading(constants.DISASSOCIATE_DEVICE))
      .run();
  });

  it('should associate a device to a certificate', async () => {
    const action = actions.associateDevice({
      fingerprint: fakeCertificate.fingerprint,
      deviceId: fakeCertificate.belongsTo.device,
    });

    const apiRequest = matchers.call.fn(Certificates.associateDevice);

    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleAssociateDevice, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.ASSOCIATE_DEVICE))
      .put(successActions.showSuccessToast({ i18nMessage: 'associateDevice' }))
      .put(loadingActions.removeLoading(constants.ASSOCIATE_DEVICE))
      .run();
  });

  it('should handle errors if fails to associate a device to a certificate', async () => {
    const action = actions.associateDevice({
      fingerprint: fakeCertificate.fingerprint,
      deviceId: fakeCertificate.belongsTo.device,
    });

    const apiRequest = matchers.call.fn(Certificates.associateDevice);

    const getCurrentPageCall = matchers.call.fn(getCurrentCertificatesPageAgain);

    return expectSaga(handleAssociateDevice, action)
      .provide([
        [apiRequest, throwError(new Error('Failed'))],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.ASSOCIATE_DEVICE))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'associateDevice',
        }),
      )
      .put(loadingActions.removeLoading(constants.ASSOCIATE_DEVICE))
      .run();
  });

  it('should create a certificate with one click', async () => {
    const successCallback = jest.fn();
    const action = actions.createCertificateOneClick({
      commonName: undefined,
      successCallback,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(Certificates.createCertificateOneClick);

    const responseData = {
      createCertificateOneClick: {
        certificatePem: fakeCertificate.pem,
        certificateFingerprint: fakeCertificate.fingerprint,
        privateKeyPEM: 'privateKeyPEM',
        publicKeyPEM: 'publicKeyPEM',
      },
    };

    return expectSaga(handleCreateCertificateOneClick, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_ONE_CLICK))
      .put(
        actions.getNewGeneratedCertificate({
          certificateData: responseData.createCertificateOneClick,
        }),
      )
      .put(successActions.showSuccessToast({ i18nMessage: 'createCertificate' }))
      .put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_ONE_CLICK))
      .run();
  });

  it('should create a certificate with CSR', async () => {
    const action = actions.createCertificateCSR({ csrPEM: 'csrPEM' });

    const apiRequest = matchers.call.fn(Certificates.createCertificateCSR);

    const responseData = {
      createCertificateCSR: {
        certificatePem: fakeCertificate.pem,
        certificateFingerprint: fakeCertificate.fingerprint,
        privateKeyPEM: 'privateKeyPEM',
        publicKeyPEM: 'publicKeyPEM',
      },
    };

    return expectSaga(handleCreateCertificateCSR, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_CSR))
      .put(
        actions.getNewGeneratedCertificate({ certificateData: responseData.createCertificateCSR }),
      )
      .put(successActions.showSuccessToast({ i18nMessage: 'createCertificate' }))
      .put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_CSR))
      .run();
  });

  it('should handle errors if fails to create a certificate with CSR', async () => {
    const action = actions.createCertificateCSR({ csrPEM: 'csrPEM' });

    const apiRequest = matchers.call.fn(Certificates.createCertificateCSR);

    return expectSaga(handleCreateCertificateCSR, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_CSR))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'createCertificate',
        }),
      )
      .put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_CSR))
      .run();
  });

  it('should create a certificate using a external ca', async () => {
    const action = actions.registerExternalCertificate({
      certificateChain: 'certificateChain',
    });

    const apiRequest = matchers.call.fn(Certificates.registerExternalCertificate);

    const responseData = {
      registerExternalCertificate: {
        certificateFingerprint: 'fingerprint',
      },
    };

    return expectSaga(handleRegisterExternalCertificate, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.REGISTER_EXTERNAL_CERTIFICATE))
      .put(
        actions.getNewGeneratedCertificate({
          certificateData: responseData.registerExternalCertificate,
        }),
      )
      .put(successActions.showSuccessToast({ i18nMessage: 'createCertificate' }))
      .put(loadingActions.removeLoading(constants.REGISTER_EXTERNAL_CERTIFICATE))
      .run();
  });

  it('should handle errors if fails to create a certificate using a external ca', async () => {
    const action = actions.registerExternalCertificate({
      certificateChain: 'certificateChain',
    });

    const apiRequest = matchers.call.fn(Certificates.registerExternalCertificate);

    return expectSaga(handleRegisterExternalCertificate, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'createCertificate',
        }),
      )
      .run();
  });

  it('should watch for an action to get certificates', async () => {
    return testSaga(watchGetCertificates)
      .next()
      .takeLatest(constants.GET_CERTIFICATES, handleGetCertificates)
      .next()
      .isDone();
  });

  it('should watch for an action to get a certificate by id', async () => {
    return testSaga(watchGetCertificateById)
      .next()
      .takeLatest(constants.GET_CERTIFICATES_BY_ID, handleGetCertificateById)
      .next()
      .isDone();
  });

  it('should watch for an action to get a certificate by fingerprint', async () => {
    return testSaga(watchGetCertificateByFingerprint)
      .next()
      .takeLatest(constants.GET_CERTIFICATES_BY_FINGERPRINT, handleGetCertificateByFingerprint)
      .next()
      .isDone();
  });

  it('should watch for an action to delete a certificate', async () => {
    return testSaga(watchDeleteCertificate)
      .next()
      .takeLatest(constants.DELETE_CERTIFICATE, handleDeleteCertificate)
      .next()
      .isDone();
  });

  it('should watch for an action to delete multiple certificates', async () => {
    return testSaga(watchDeleteMultipleCertificates)
      .next()
      .takeLatest(constants.DELETE_MULTIPLE_CERTIFICATES, handleDeleteMultipleCertificates)
      .next()
      .isDone();
  });

  it('should watch for an action to disassociate a device of a certificate', async () => {
    return testSaga(watchDisassociateDevice)
      .next()
      .takeLatest(constants.DISASSOCIATE_DEVICE, handleDisassociateDevice)
      .next()
      .isDone();
  });

  it('should watch for an action to associate a device to a certificate', async () => {
    return testSaga(watchAssociateDevice)
      .next()
      .takeLatest(constants.ASSOCIATE_DEVICE, handleAssociateDevice)
      .next()
      .isDone();
  });

  it('should watch for an action to create certificate with one click', async () => {
    return testSaga(watchCreateCertificateOneClick)
      .next()
      .takeLatest(constants.CREATE_CERTIFICATE_ONE_CLICK, handleCreateCertificateOneClick)
      .next()
      .isDone();
  });

  it('should watch for an action to get certificates', async () => {
    return testSaga(watchCreateCertificateCSR)
      .next()
      .takeLatest(constants.CREATE_CERTIFICATE_CSR, handleCreateCertificateCSR)
      .next()
      .isDone();
  });

  it('should watch for an action to create a certificate using a external ca', async () => {
    return testSaga(watchRegisterExternalCertificate)
      .next()
      .takeLatest(constants.REGISTER_EXTERNAL_CERTIFICATE, handleRegisterExternalCertificate)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    certificatesSaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
