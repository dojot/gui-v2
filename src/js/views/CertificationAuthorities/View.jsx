import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from '../../common/components/Dialogs';
import { EmptyPlaceholder } from '../../common/components/EmptyPlaceholder';
import { CERTIFICATION_AUTHORITIES_PAGE_KEYS, DATA_ORDER, VIEW_MODE } from '../../common/constants';
import { useIsLoading, usePersistentState } from '../../common/hooks';
import {
  actions as certificationAuthoritiesActions,
  constants,
} from '../../redux/modules/certificationAuthorities';
import {
  certificationAuthoritiesSelector,
  paginationControlSelector,
} from '../../redux/selectors/certificationAuthoritiesSelector';
import { ViewContainer } from '../stateComponents';
import CaOptionsMenu from './layout/CaOptionsMenu';
import Cards from './layout/Cards';
import CertificationAuthoritiesLoading from './layout/CertificationAuthoritiesLoading';
import DataTable from './layout/DataTable';
import MassActions from './layout/MassActions';
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

  const [selectedAuthorities, setSelectedAuthorities] = useState([]);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [certificationAuthorityOptionsMenu, setCertificationAuthorityOptionsMenu] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState(DATA_ORDER.ASC);

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
    setSelectedAuthorities([]);
  };

  const handleDeleteMultipleCertificationmAuthorities = () => {
    setIsShowingMultipleDeleteAlert(false);
    dispatch(
      certificationAuthoritiesActions.deleteCertificationAuthority({
        certificationAuthoritiesIds: selectedAuthorities,
      }),
    );
    setSelectedAuthorities(currentSelectedAuthorities => {
      return currentSelectedAuthorities.filter(id => !selectedAuthorities.includes(id));
    });
  };

  const handleConfirmMultipleCaDeletion = () => {
    setSelectedAuthorities([]);
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleCloseMultipleCaDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleHideOptionsMenu = () => {
    setCertificationAuthorityOptionsMenu(null);
  };

  const handleDeleteCertificationAuthority = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleConfirmCaDeletion = () => {
    const authorityId = certificationAuthorityOptionsMenu.certificationAuthority.id;
    dispatch(certificationAuthoritiesActions.deleteCertificationAuthority({ authorityId }));
    setSelectedAuthorities(currentSelectedAuthorities => {
      return currentSelectedAuthorities.filter(id => id !== authorityId);
    });
  };

  const handleCloseCaDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleSearchCertificationAuthorities = search => {
    dispatch(
      certificationAuthoritiesActions.getCertificationAuthorities({
        filter: { label: search },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      certificationAuthoritiesActions.getCertificationAuthorities({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    if (viewMode) setSelectedAuthorities([]);
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
      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        cancelButtonText={t('common:cancel')}
        confirmButtonText={t('common:exclude')}
        title={t('deleteMultipleCaAlert.title')}
        message={t('deleteMultipleCaAlert.message')}
        handleConfirm={handleConfirmMultipleCaDeletion}
        handleClose={handleCloseMultipleCaDeletionAlert}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteCaAlert.title')}
        message={t('deleteCaAlert.message')}
        handleConfirm={handleConfirmCaDeletion}
        handleClose={handleCloseCaDeletionAlert}
        cancelButtonText={t('deleteCaAlert.cancelButton')}
        confirmButtonText={t('deleteCaAlert.confirmButton')}
      />

      <CaOptionsMenu
        isShowingMenu={!!certificationAuthorityOptionsMenu}
        anchorElement={certificationAuthorityOptionsMenu?.anchorElement}
        handleHideOptionsMenu={handleHideOptionsMenu}
        handleDeleteCa={handleDeleteCertificationAuthority}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          handleChangeViewMode={setViewMode}
          handleSearchCertificationAuthorities={handleSearchCertificationAuthorities}
        />

        {selectedAuthorities.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteMultipleCertificationmAuthorities={
              handleDeleteMultipleCertificationmAuthorities
            }
          />
        )}

        <Box className={classes.content}>
          {isLoadingCertificationAuthorities ? (
            <CertificationAuthoritiesLoading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && certificationAuthorities.length > 0 && (
                <DataTable
                  order={order}
                  orderBy={orderBy}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  certificationAuthorities={certificationAuthorities}
                  selectedCertificationAuthorities={selectedAuthorities}
                  handleSelectAuthority={setSelectedAuthorities}
                />
              )}

              {viewMode === VIEW_MODE.CARD && certificationAuthorities.length > 0 && (
                <Cards
                  certificationAuthorities={certificationAuthorities}
                  handleSetCaOptionsMenu={setCertificationAuthorityOptionsMenu}
                />
              )}

              {certificationAuthorities.length === 0 && (
                <EmptyPlaceholder
                  textButton={t('createCa')}
                  emptyListMessage={t('emptyListMessage')}
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
          numberOfSelectedAuthorities={selectedAuthorities.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default CertificationAuthorities;
