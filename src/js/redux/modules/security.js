import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const LOADING = 'app/security/LOADING';
const GET_CERTIFICATES = 'app/security/GET_CERTIFICATES';
const ATTACH_CERTIFICATE = 'app/security/ATTACH_CERTIFICATE';
const DETACH_CERTIFICATE = 'app/security/DETACH_CERTIFICATE';
const CREATE_ON_CLICK_CERTIFICATE = 'app/security/CREATE_ON_CLICK_CERTIFICATE';
const UPDATE_CERTIFICATE = 'app/security/UPDATE_CERTIFICATE';
const DELETE_CERTIFICATE = 'app/security/DELETE_CERTIFICATE';
const DELETE_MULTIPLE_CERTIFICATES = 'app/security/DELETE_MULTIPLE_CERTIFICATES';

export const constants = {
  LOADING,
  GET_CERTIFICATES,
  ATTACH_CERTIFICATE,
  DETACH_CERTIFICATE,
  CREATE_ON_CLICK_CERTIFICATE,
  UPDATE_CERTIFICATE,
  DELETE_CERTIFICATE,
  DELETE_MULTIPLE_CERTIFICATES,
};

export const setLoading = createAction(LOADING, payload => ({}));

export const getCertificates = createAction(GET_CERTIFICATES, payload => ({}));

export const attachCertificate = createAction(ATTACH_CERTIFICATE, payload => ({}));

export const detachCertificate = createAction(DETACH_CERTIFICATE, payload => ({}));

export const deleteCertificate = createAction(DELETE_CERTIFICATE, payload => ({}));

export const deleteMultipleCertificates = createAction(
  DELETE_MULTIPLE_CERTIFICATES,
  payload => ({}),
);

export const createOneClickCertificate = createAction(CREATE_ON_CLICK_CERTIFICATE, payload => ({}));

export const updateCertificate = createAction(UPDATE_CERTIFICATE, payload => ({}));

export const actions = {
  setLoading,
  getCertificates,
  attachCertificate,
  detachCertificate,
  deleteCertificate,
  deleteMultipleCertificates,
  createOneClickCertificate,
  updateCertificate,
};

export const reducers = {
  [UPDATE_CERTIFICATE]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    certificates: [],
    loading: false,
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });
};

export default handleActions(reducers, initialState());
