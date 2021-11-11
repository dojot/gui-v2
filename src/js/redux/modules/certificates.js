import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_CERTIFICATES = 'app/certificates/GET_CERTIFICATES';
const UPDATE_CERTIFICATES = 'app/certificates/UPDATE_CERTIFICATES';
const LOADING = 'app/certificates/LOADING';
const DELETE_CERTIFICATE = 'app/certificates/DELETE_CERTIFICATES';
const DELETE_ALL_CERTIFICATES = 'app/certificates/DELETE_ALL_CERTIFICATES';

export const constants = {
  GET_CERTIFICATES,
  UPDATE_CERTIFICATES,
  LOADING,
  DELETE_CERTIFICATE,
  DELETE_ALL_CERTIFICATES,
};

export const getCertificates = createAction(GET_CERTIFICATES, payload => ({
  page: payload.page,
  filter: payload.filter,
}));

export const updateCertificates = createAction(UPDATE_CERTIFICATES, payload => ({
  certificates: payload.certificates,
  paginationControl: {
    totalPages: payload.totalPages,
    currentPage: payload.currentPage,
  },
}));

export const setLoadingCertificates = createAction(LOADING, payload => ({
  loading: payload,
}));

export const deleteCertificate = createAction(DELETE_CERTIFICATE, payload => ({
  certificateId: payload.certificateId,
}));

export const deleteMultipleCertificates = createAction(DELETE_ALL_CERTIFICATES, payload => ({
  certificatesIdArray: payload.certificatesIdArray,
}));

export const actions = {
  getCertificates,
  updateCertificates,
  setLoadingCertificates,
  deleteCertificate,
  deleteMultipleCertificates,
};

export const reducers = {
  [UPDATE_CERTIFICATES]: (state, { payload }) => {
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
