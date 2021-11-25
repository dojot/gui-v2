import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_CERTIFICATES = 'app/certificates/GET_CERTIFICATES';
const UPDATE_CERTIFICATES = 'app/certificates/UPDATE_CERTIFICATES';
const DELETE_CERTIFICATE = 'app/certificates/DELETE_CERTIFICATES';
const DELETE_ALL_CERTIFICATES = 'app/certificates/DELETE_ALL_CERTIFICATES';
const DISASSOCIATE_DEVICE = 'app/certificates/DISASSOCIATE_DEVICE';

export const constants = {
  GET_CERTIFICATES,
  UPDATE_CERTIFICATES,
  DELETE_CERTIFICATE,
  DELETE_ALL_CERTIFICATES,
  DISASSOCIATE_DEVICE,
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

export const deleteCertificate = createAction(DELETE_CERTIFICATE, payload => ({
  certificateId: payload.certificateId,
}));

export const deleteMultipleCertificates = createAction(DELETE_ALL_CERTIFICATES, payload => ({
  certificatesIdArray: payload.certificatesIdArray,
}));

export const disassociateDevice = createAction(DISASSOCIATE_DEVICE, payload => ({
  certificate: payload.certificate,
}));

export const actions = {
  getCertificates,
  updateCertificates,
  deleteCertificate,
  deleteMultipleCertificates,
  disassociateDevice,
};

export const reducers = {
  [UPDATE_CERTIFICATES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    certificates: [],
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });
};

export default handleActions(reducers, initialState());
