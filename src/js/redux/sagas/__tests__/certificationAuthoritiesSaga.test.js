import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { CertificationAuthority } from 'Services';

import { constants, actions } from '../../modules/certificationAuthorities';
import { actions as errorActions } from '../../modules/errors';
import { actions as loadingActions } from '../../modules/loading';
import { actions as successActions } from '../../modules/success';
import { paginationControlSelector } from '../../selectors/certificationAuthoritiesSelector';
import {
  certificationAuthoritySaga,
  getCurrentCertificationAuthoritiesPageAgain,
  handleCreateCertificationAuthority,
  handleDeleteCertificationAuthority,
  handleDeleteMultipleCertificationAuthorities,
  handleGetCertificationAuthorities,
  watchCreateCertificationAuthority,
  watchDeleteCertificationAuthority,
  watchDeleteMultipleCertificationAuthorities,
  watchGetCertificationAuthorities,
} from '../certificationAuthoritiesSaga';

describe('certificationAuthoritiesSaga', () => {
  beforeAll(() => {
    // Using fake timers because errorActions.addError uses Date.now()
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.now());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeCertificationAuthority = {
    allowAutoRegistration: false,
    caFingerprint: '123456',
    caPem: '123456',
    subjectDN: '123456',
    tenant: '123456',
    createdAt: '01/01/2021',
    modifiedAt: '01/01/2021',
    validity: {
      notBefore: '01/01/2022',
      notAfter: '01/01/2021',
    },
  };

  it('should get the current page of certification authorities again', async () => {
    const selectPagination = matchers.select(paginationControlSelector);

    const pagination = {
      currentPage: 1,
      itemsPerPage: 10,
    };

    return expectSaga(getCurrentCertificationAuthoritiesPageAgain)
      .provide([[selectPagination, pagination]])
      .select(paginationControlSelector)
      .put(
        actions.getCertificationAuthorities({
          page: {
            number: pagination.currentPage,
            size: pagination.itemsPerPage,
          },
        }),
      )
      .run();
  });

  it('should get a list of certification authorities with pagination', async () => {
    const action = actions.getCertificationAuthorities({
      page: { size: 10, number: 1 },
      filter: { caFingerprint: fakeCertificationAuthority.caFingerprint },
    });

    const apiRequest = matchers.call.fn(CertificationAuthority.getCertificationAuthoritiesList);

    const responseData = {
      getCertificationAuthorities: {
        certificationAuthorities: [fakeCertificationAuthority],
        pagination: {
          currentPage: 1,
          totalPages: 1,
        },
      },
    };

    return expectSaga(handleGetCertificationAuthorities, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATION_AUTHORITIES))
      .put(
        actions.updateCertificationAuthorities({
          certificationAuthorities:
            responseData.getCertificationAuthorities.certificationAuthorities,
          paginationControl: {
            currentPage: responseData.getCertificationAuthorities.pagination.currentPage,
            totalPages: responseData.getCertificationAuthorities.pagination.totalPages,
            itemsPerPage: action.payload.page.size,
          },
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATION_AUTHORITIES))
      .run();
  });

  it('should handle errors if fails to get certification authorities', async () => {
    const action = actions.getCertificationAuthorities({
      page: { size: 10, number: 1 },
      filter: { caFingerprint: 'caFingerprint' },
    });

    const apiRequest = matchers.call.fn(CertificationAuthority.getCertificationAuthoritiesList);

    return expectSaga(handleGetCertificationAuthorities, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_CERTIFICATION_AUTHORITIES))
      .put(actions.updateCertificationAuthorities({ certificationAuthorities: [] }))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'getCertificationAuthorities',
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_CERTIFICATION_AUTHORITIES))
      .run();
  });

  it('should delete a certification authority', async () => {
    const action = actions.deleteCertificationAuthority({
      fingerprint: fakeCertificationAuthority.caFingerprint,
    });

    const apiRequest = matchers.call.fn(
      CertificationAuthority.deleteMultipleCertificationAuthorities,
    );

    const getCurrentPageCall = matchers.call.fn(getCurrentCertificationAuthoritiesPageAgain);

    return expectSaga(handleDeleteCertificationAuthority, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_CERTIFICATION_AUTHORITY))
      .put(
        successActions.showSuccessToast({
          i18nMessage: 'deleteCertificationAuthority',
        }),
      )
      .put(loadingActions.removeLoading(constants.DELETE_CERTIFICATION_AUTHORITY))
      .run();
  });

  it('should handle errors if fails to delete a certification authority', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteCertificationAuthority({
      successCallback,
      caFingerprint: fakeCertificationAuthority.caFingerprint,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(
      CertificationAuthority.deleteMultipleCertificationAuthorities,
    );

    return expectSaga(handleDeleteCertificationAuthority, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_CERTIFICATION_AUTHORITY))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'deleteCertificationAuthority',
        }),
      )
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_CERTIFICATION_AUTHORITY))
      .run();
  });

  it('should delete multiple certification authorities', async () => {
    const action = actions.deleteMultipleCertificationAuthorities({
      fingerprints: [fakeCertificationAuthority.caFingerprint],
    });

    const apiRequest = matchers.call.fn(
      CertificationAuthority.deleteMultipleCertificationAuthorities,
    );
    const getCurrentPageCall = matchers.call.fn(getCurrentCertificationAuthoritiesPageAgain);

    return expectSaga(handleDeleteMultipleCertificationAuthorities, action)
      .provide([
        [apiRequest, null],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES))
      .put(
        successActions.showSuccessToast({
          i18nMessage: 'deleteMultipleCertificationAuthorities',
        }),
      )
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES))
      .run();
  });

  it('should handle errors if fails to delete multiple certification authorities', async () => {
    const action = actions.deleteMultipleCertificationAuthorities({
      fingerprints: [fakeCertificationAuthority.caFingerprint],
    });

    const apiRequest = matchers.call.fn(
      CertificationAuthority.deleteMultipleCertificationAuthorities,
    );
    const getCurrentPageCall = matchers.call.fn(getCurrentCertificationAuthoritiesPageAgain);

    return expectSaga(handleDeleteMultipleCertificationAuthorities, action)
      .provide([
        [apiRequest, throwError(new Error('Failed'))],
        [getCurrentPageCall, null],
      ])
      .put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'deleteMultipleCertificationAuthorities',
        }),
      )
      .put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES))
      .run();
  });

  it('should create a certification authority', async () => {
    const successCallback = jest.fn();

    const action = actions.createCertificationAuthority({
      successCallback,
      caPem: fakeCertificationAuthority.caPem,
    });

    const apiRequest = matchers.call.fn(CertificationAuthority.createCertificationAuthority);

    return expectSaga(handleCreateCertificationAuthority, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.CREATE_CERTIFICATION_AUTHORITY))
      .put(
        successActions.showSuccessToast({
          i18nMessage: 'createCertificationAuthority',
        }),
      )
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_CERTIFICATION_AUTHORITY))
      .run();
  });

  it('should handle errors if fails to create a certification authority', async () => {
    const successCallback = jest.fn();

    const action = actions.createCertificationAuthority({
      successCallback,
      caPem: fakeCertificationAuthority.caPem,
    });

    const apiRequest = matchers.call.fn(CertificationAuthority.createCertificationAuthority);

    return expectSaga(handleCreateCertificationAuthority, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.CREATE_CERTIFICATION_AUTHORITY))
      .put(
        errorActions.addError({
          message: 'Failed',
          i18nMessage: 'createCertificationAuthority',
        }),
      )
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_CERTIFICATION_AUTHORITY))
      .run();
  });

  it('should watch for an action to get certification authorities', async () => {
    return testSaga(watchGetCertificationAuthorities)
      .next()
      .takeLatest(constants.GET_CERTIFICATION_AUTHORITIES, handleGetCertificationAuthorities)
      .next()
      .isDone();
  });

  it('should watch for an action to delete a certification authority', async () => {
    return testSaga(watchDeleteCertificationAuthority)
      .next()
      .takeLatest(constants.DELETE_CERTIFICATION_AUTHORITY, handleDeleteCertificationAuthority)
      .next()
      .isDone();
  });

  it('should watch for an action to delete multiple certification authorities', async () => {
    return testSaga(watchDeleteMultipleCertificationAuthorities)
      .next()
      .takeLatest(
        constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
        handleDeleteMultipleCertificationAuthorities,
      )
      .next()
      .isDone();
  });

  it('should watch for an action to create a certification authority', async () => {
    return testSaga(watchCreateCertificationAuthority)
      .next()
      .takeLatest(constants.CREATE_CERTIFICATION_AUTHORITY, handleCreateCertificationAuthority)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    certificationAuthoritySaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
