import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { isNumber } from 'lodash';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from '../../common/components/Dialogs';
import { EmptyPlaceholder } from '../../common/components/EmptyPlaceholder';
import {
  CERTIFICATION_AUTHORITIES_PAGE_KEYS,
  DATA_ORDER,
  ROWS_PER_PAGE_OPTIONS,
  VIEW_MODE,
} from '../../common/constants';
import { useIsLoading, usePersistentState, useSearchParamState } from '../../common/hooks';
import {
  actions as certificationAuthoritiesActions,
  constants,
} from '../../redux/modules/certificationAuthorities';
import {
  certificationAuthoritiesSelector,
  paginationControlSelector,
} from '../../redux/selectors/certificationAuthoritiesSelector';
import { ViewContainer } from '../stateComponents';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import Loading from './layout/Loading';
import MassActions from './layout/MassActions';
import OptionsMenu from './layout/OptionsMenu';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const CertificationAuthorities = () => {
  const { t } = useTranslation(['certificationAuthorities', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { totalPages } = useSelector(paginationControlSelector);
  const certificationAuthorities = useSelector(certificationAuthoritiesSelector);
  const isLoadingCertificationAuthorities = useIsLoading(constants.GET_CERTIFICATION_AUTHORITIES);

  const [selectedCertificationAuthorities, setSelectedCertificationAuthorities] = useState([]);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [certificationAuthorityOptionsMenu, setCertificationAuthorityOptionsMenu] = useState(null);

  const [page, setPage] = useSearchParamState({
    key: 'p',
    type: 'number',
    defaultValue: 0,
    valueFormatter(value, defaultValue) {
      const zeroBasedTotalPages = totalPages - 1;
      if (isNumber(value) && value >= 0 && value <= zeroBasedTotalPages) return value;
      return defaultValue;
    },
  });

  const [order, setOrder] = useSearchParamState({
    key: 'or',
    type: 'string',
    defaultValue: DATA_ORDER.ASC,
    valueFormatter(value, defaultValue) {
      if (Object.values(DATA_ORDER).includes(value)) return value;
      return defaultValue;
    },
  });

  const [rowsPerPage, setRowsPerPage] = useSearchParamState({
    key: 'r',
    type: 'number',
    defaultValue: ROWS_PER_PAGE_OPTIONS[0],
    valueFormatter(value, defaultValue) {
      if (isNumber(value) && ROWS_PER_PAGE_OPTIONS.includes(value)) return value;
      return defaultValue;
    },
  });

  const [orderBy, setOrderBy] = useSearchParamState({
    key: 'ob',
    type: 'string',
    defaultValue: '',
  });

  const [searchText, setSearchText] = useSearchParamState({
    key: 's',
    type: 'string',
    defaultValue: '',
  });

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: CERTIFICATION_AUTHORITIES_PAGE_KEYS.VIEW_MODE,
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleHideMassActions = () => {
    setSelectedCertificationAuthorities([]);
  };

  const handleDeleteMultipleCertificationAuthorities = () => {
    setIsShowingMultipleDeleteAlert(true);
  };

  const handleConfirmMultipleDeletion = () => {
    dispatch(
      certificationAuthoritiesActions.deleteMultipleCertificationAuthorities({
        fingerprints: selectedCertificationAuthorities,
      }),
    );
    setIsShowingMultipleDeleteAlert(false);
    setSelectedCertificationAuthorities(currentSelectedAuthorities => {
      return currentSelectedAuthorities.filter(
        fingerprint => !selectedCertificationAuthorities.includes(fingerprint),
      );
    });
  };

  const handleCloseMultipleDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleHideOptionsMenu = () => {
    setCertificationAuthorityOptionsMenu(null);
  };

  const handleDeleteCertificationAuthority = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleConfirmDeletion = () => {
    const fingerprint = certificationAuthorityOptionsMenu.certificationAuthority.caFingerprint;
    dispatch(certificationAuthoritiesActions.deleteCertificationAuthority({ fingerprint }));
    setSelectedCertificationAuthorities(currentSelectedAuthorities => {
      return currentSelectedAuthorities.filter(
        currentFingerprint => currentFingerprint !== fingerprint,
      );
    });
  };

  const handleCloseCaDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleSearchCertificationAuthorities = search => {
    setPage(0);
    setSearchText(search);
  };

  useEffect(() => {
    dispatch(
      certificationAuthoritiesActions.getCertificationAuthorities({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        filter: {
          caFingerprint: searchText,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage, searchText]);

  useEffect(() => {
    if (viewMode) setSelectedCertificationAuthorities([]);
  }, [viewMode]);

  useEffect(() => {
    return () => {
      dispatch(
        certificationAuthoritiesActions.updateCertificationAuthorities({
          certificationAuthorities: [],
        }),
      );
    };
  }, [dispatch]);

  return (
    <ViewContainer headerTitle={t('headerTitle')}>
      <Helmet
        title={`${t('certificationAuthorities:headerTitle')} • ${t('common:dojotPageTitle')}`}
      />

      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        cancelButtonText={t('common:cancel')}
        confirmButtonText={t('common:exclude')}
        title={t('deleteMultipleAlertModal.title')}
        message={t('deleteMultipleAlertModal.message')}
        handleConfirm={handleConfirmMultipleDeletion}
        handleClose={handleCloseMultipleDeletionAlert}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteAlertModal.title')}
        message={t('deleteAlertModal.message')}
        handleConfirm={handleConfirmDeletion}
        handleClose={handleCloseCaDeletionAlert}
        cancelButtonText={t('deleteAlertModal.cancelButton')}
        confirmButtonText={t('deleteAlertModal.confirmButton')}
      />

      <OptionsMenu
        isShowingMenu={!!certificationAuthorityOptionsMenu}
        anchorElement={certificationAuthorityOptionsMenu?.anchorElement}
        handleHideOptionsMenu={handleHideOptionsMenu}
        handleDelete={handleDeleteCertificationAuthority}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          lastSearchedText={searchText}
          handleChangeViewMode={setViewMode}
          handleSearchCertificationAuthorities={handleSearchCertificationAuthorities}
        />

        {selectedCertificationAuthorities.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteMultipleCertificationAuthorities={
              handleDeleteMultipleCertificationAuthorities
            }
          />
        )}

        <Box className={classes.content}>
          {isLoadingCertificationAuthorities ? (
            <Loading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && certificationAuthorities.length > 0 && (
                <DataTable
                  order={order}
                  orderBy={orderBy}
                  certificationAuthorities={certificationAuthorities}
                  selectedCertificationAuthorities={selectedCertificationAuthorities}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  handleSetOptionsMenu={setCertificationAuthorityOptionsMenu}
                  handleSelectCertificationAuthority={setSelectedCertificationAuthorities}
                />
              )}

              {viewMode === VIEW_MODE.CARD && certificationAuthorities.length > 0 && (
                <Cards
                  certificationAuthorities={certificationAuthorities}
                  handleSetOptionsMenu={setCertificationAuthorityOptionsMenu}
                />
              )}

              {certificationAuthorities.length === 0 && (
                <EmptyPlaceholder
                  emptyListMessage={t('emptyListMessage')}
                  textButton={t('createCertificationAuthority')}
                  icon={<VerifiedUserOutlined fontSize='large' />}
                  handleButtonClick={() => history.push('/certification-authorities/new')}
                />
              )}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfPages={totalPages}
          numberOfSelectedItems={selectedCertificationAuthorities.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default CertificationAuthorities;
