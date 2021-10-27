import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_CERTIFICATION_AUTHORITIES = 'app/certification_authorities/GET_CERTIFICATION_AUTHORITIES';
const UPDATE_CERTIFICATION_AUTHORITIES =
  'app/certification_authorities/UPDATE_CERTIFICATION_AUTHORITIES';
const LOADING = 'app/certification_authorities/LOADING';
const DELETE_CERTIFICATION_AUTHORITY =
  'app/certification_authorities/DELETE_CERTIFICATION_AUTHORITIES';
const DELETE_ALL_CERTIFICATION_AUTHORITIES =
  'app/certification_authorities/DELETE_ALL_CERTIFICATION_AUTHORITIES';

export const constants = {
  GET_CERTIFICATION_AUTHORITIES,
  UPDATE_CERTIFICATION_AUTHORITIES,
  LOADING,
  DELETE_CERTIFICATION_AUTHORITY,
  DELETE_ALL_CERTIFICATION_AUTHORITIES,
};

export const getCertificationAuthorities = createAction(GET_CERTIFICATION_AUTHORITIES, payload => ({
  page: payload.page,
  filter: payload.filter,
}));

export const updateCertificationAuthorities = createAction(
  UPDATE_CERTIFICATION_AUTHORITIES,
  payload => ({
    certificationAuthorities: payload.certificationAuthorities,
    paginationControl: {
      totalPages: payload.totalPages,
      currentPage: payload.currentPage,
    },
  }),
);

export const setLoadingCertificationAuthorities = createAction(LOADING, payload => ({
  loading: payload,
}));

export const deleteCertificationAuthority = createAction(
  DELETE_CERTIFICATION_AUTHORITY,
  payload => ({
    certificationAuthorityId: payload.certificationAuthorityId,
  }),
);

export const deleteMultipleCertificationAuthorities = createAction(
  DELETE_ALL_CERTIFICATION_AUTHORITIES,
  payload => ({
    certificationAuthoritiesIdArray: payload.certificationAuthoritiesIdArray,
  }),
);

export const actions = {
  getCertificationAuthorities,
  updateCertificationAuthorities,
  setLoadingCertificationAuthorities,
  deleteCertificationAuthority,
  deleteMultipleCertificationAuthorities,
};

export const reducers = {
  [UPDATE_CERTIFICATION_AUTHORITIES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    certificationAuthorities: [],
    loading: false,
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
    },
  });
};

export default handleActions(reducers, initialState());
