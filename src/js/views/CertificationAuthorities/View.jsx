import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AlertDialog } from '../../common/components/Dialogs';
import { EmptyPlaceholder } from '../../common/components/EmptyPlaceholder';
import { CERTIFICATION_AUTHORITIES_PAGE_KEYS, VIEW_MODE } from '../../common/constants';
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
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const certificationAuthorities = useSelector(certificationAuthoritiesSelector);
  const isLoadingCertificationAuthorities = useIsLoading(constants.GET_CERTIFICATION_AUTHORITIES);
  const { totalPages } = useSelector(paginationControlSelector);
  const [page] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);
  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [certificationAuthorityOptionsMenu, setCertificationAuthorityOptionsMenu] = useState(null);
  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: CERTIFICATION_AUTHORITIES_PAGE_KEYS.VIEW_MODE,
  });

  const { t } = useTranslation('certificationAuthorities');

  const handleHideMassActions = () => {
    setSelectedAuthorities([]);
  };

  const handleDeleteMultipleCa = () => {
    setIsShowingMultipleDeleteAlert(true);
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
    dispatch(certificationAuthoritiesActions.deleteDevice({ authorityId }));
    setSelectedAuthorities(currentSelectedDevices => {
      return currentSelectedDevices.filter(id => id !== authorityId);
    });
  };

  const handleCloseCaDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  return (
    <ViewContainer headerTitle={t('headerTitle')}>
      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        title={t('deleteMultipleCaAlert.title')}
        message={t('deleteMultipleCaAlert.message')}
        handleConfirm={handleConfirmMultipleCaDeletion}
        handleClose={handleCloseMultipleCaDeletionAlert}
        cancelButtonText='cancelar'
        confirmButtonText='confirmar'
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
        handleDeleteCa={handleDeleteCertificationAuthority}
        handleHideOptionsMenu={handleHideOptionsMenu}
      />

      <Box className={classes.container}>
        <SearchBar viewMode={viewMode} handleChangeViewMode={setViewMode} />

        {selectedAuthorities.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteMultipleDevices={handleDeleteMultipleCa}
          />
        )}

        <Box className={classes.content}>
          {isLoadingCertificationAuthorities ? (
            <CertificationAuthoritiesLoading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && certificationAuthorities.length > 0 && (
                <DataTable
                  page={page}
                  certificationAuthorities={certificationAuthorities}
                  rowsPerPage={rowsPerPage}
                  selectedCertificationAuthorities={selectedAuthorities}
                  handleSelectAuthority={setSelectedAuthorities}
                />
              )}

              {viewMode === VIEW_MODE.CARD && certificationAuthorities.length > 0 && (
                <Cards
                  page={page}
                  rowsPerPage={rowsPerPage}
                  certificationAuthorities={certificationAuthorities}
                  handleSetCaOptionsMenu={setCertificationAuthorityOptionsMenu}
                />
              )}

              {certificationAuthorities.length === 0 && (
                <EmptyPlaceholder
                  emptyListMessage={t('emptyListMessage')}
                  icon={<VerifiedUserOutlined fontSize='large' />}
                  handleButtonClick={() => history.push('/certification-authorities/new')}
                  textButton={t('createCa')}
                />
              )}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfDevices={totalPages}
          numberOfSelectedDevices={selectedAuthorities.length}
        />
      </Box>
    </ViewContainer>
  );
};

export default CertificationAuthorities;
