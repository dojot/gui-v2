import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { isNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import {
  CERTIFICATES_PAGE_KEYS,
  DATA_ORDER,
  ROWS_PER_PAGE_OPTIONS,
  VIEW_MODE,
} from 'sharedComponents/Constants';
import { useIsLoading, usePersistentState, useSearchParamState } from 'sharedComponents/Hooks';
import {
  actions as certificatesActions,
  constants as certificatesConstants,
} from '../../redux/modules/certificates';
import {
  certificatesSelector,
  paginationControlSelector,
} from '../../redux/selectors/certificatesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import AssociateToDeviceModal from './layout/AssociateToDeviceModal';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import Loading from './layout/Loading';
import MassActions from './layout/MassActions';
import OptionsMenu from './layout/OptionsMenu';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Certificates = () => {
  const { t } = useTranslation('certificates');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const certificates = useSelector(certificatesSelector);
  const { totalPages } = useSelector(paginationControlSelector);
  const isLoadingCertificates = useIsLoading(certificatesConstants.GET_CERTIFICATES);

  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [certificatesOptionsMenu, setCertificatesOptionsMenu] = useState(null);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingDevicesToAssociate, setIsShowingDevicesToAssociate] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [isShowingDisassociateDeviceAlert, setIsShowingDisassociateDeviceAlert] = useState(false);

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
    key: CERTIFICATES_PAGE_KEYS.VIEW_MODE,
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchCertificate = search => {
    setPage(0);
    setSearchText(search);
  };

  const handleHideOptionsMenu = () => {
    setCertificatesOptionsMenu(null);
  };

  const handleHideDevicesToAssociateModal = () => {
    setIsShowingDevicesToAssociate(false);
    handleHideOptionsMenu();
  };

  const handleShowDevicesToAssociate = () => {
    setIsShowingDevicesToAssociate(true);
  };

  const handleHideMassActions = () => {
    setSelectedCertificates([]);
  };

  const handleCloseMultipleCertificatesDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleCloseDisassociateDeviceAlert = () => {
    setIsShowingDisassociateDeviceAlert(false);
    handleHideOptionsMenu();
  };

  const handleConfirmCertificateDeletion = () => {
    const { fingerprint } = certificatesOptionsMenu.certificate;
    dispatch(certificatesActions.deleteCertificate({ fingerprint }));
    setSelectedCertificates(currentSelectedCertificates => {
      return currentSelectedCertificates.filter(
        currentFingerprint => currentFingerprint !== fingerprint,
      );
    });
  };

  const handleConfirmMultipleCertificatesDeletion = () => {
    dispatch(
      certificatesActions.deleteMultipleCertificates({
        fingerprints: selectedCertificates,
      }),
    );
    setIsShowingMultipleDeleteAlert(false);
    handleHideMassActions();
  };

  const handleConfirmDisassociateDevice = () => {
    const { fingerprint } = certificatesOptionsMenu.certificate;
    dispatch(certificatesActions.disassociateDevice({ fingerprint }));
    setIsShowingDisassociateDeviceAlert(false);
  };

  const handleCloseCertificateDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleDeleteCertificate = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleDeleteMultipleCertificates = () => {
    setIsShowingMultipleDeleteAlert(true);
  };

  const handleDisassociateDevice = () => {
    setIsShowingDisassociateDeviceAlert(true);
  };

  useEffect(() => {
    dispatch(
      certificatesActions.getCertificates({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        filter: {
          fingerprint: searchText,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage, searchText]);

  useEffect(() => {
    if (viewMode) setSelectedCertificates([]);
  }, [viewMode]);

  useEffect(() => {
    return () => {
      dispatch(certificatesActions.updateCertificates({ certificates: [] }));
    };
  }, [dispatch]);

  return (
    <ViewContainer headerTitle={t('headerTitle')}>
      <AssociateToDeviceModal
        isOpen={isShowingDevicesToAssociate}
        certificate={certificatesOptionsMenu?.certificate || {}}
        handleHideDevicesToAssociateModal={handleHideDevicesToAssociateModal}
      />

      <OptionsMenu
        isShowingMenu={!!certificatesOptionsMenu}
        anchorElement={certificatesOptionsMenu?.anchorElement}
        certificate={certificatesOptionsMenu?.certificate}
        handleHideOptionsMenu={handleHideOptionsMenu}
        handleShowDevicesToAssociate={handleShowDevicesToAssociate}
        handleDeleteCertificate={handleDeleteCertificate}
        handleDisassociateDevice={handleDisassociateDevice}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteCertificateAlert.title')}
        message={t('deleteCertificateAlert.message')}
        handleConfirm={handleConfirmCertificateDeletion}
        handleClose={handleCloseCertificateDeletionAlert}
        cancelButtonText={t('deleteCertificateAlert.cancelButton')}
        confirmButtonText={t('deleteCertificateAlert.confirmButton')}
      />

      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        title={t('deleteMultipleCertificatesAlert.title')}
        message={t('deleteMultipleCertificatesAlert.message')}
        handleConfirm={handleConfirmMultipleCertificatesDeletion}
        handleClose={handleCloseMultipleCertificatesDeletionAlert}
        cancelButtonText={t('deleteMultipleCertificatesAlert.cancelButton')}
        confirmButtonText={t('deleteMultipleCertificatesAlert.confirmButton')}
      />

      <AlertDialog
        isOpen={isShowingDisassociateDeviceAlert}
        title={t('disassociateDeviceAlert.title', {
          deviceId: certificatesOptionsMenu?.certificate?.belongsTo?.device,
        })}
        message={t('disassociateDeviceAlert.message', {
          deviceId: certificatesOptionsMenu?.certificate?.belongsTo?.device,
        })}
        handleConfirm={handleConfirmDisassociateDevice}
        handleClose={handleCloseDisassociateDeviceAlert}
        cancelButtonText={t('disassociateDeviceAlert.cancelButton')}
        confirmButtonText={t('disassociateDeviceAlert.confirmButton')}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          lastSearchedText={searchText}
          handleChangeViewMode={setViewMode}
          handleSearchCertificate={handleSearchCertificate}
        />

        {selectedCertificates.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteMultipleCertificates={handleDeleteMultipleCertificates}
          />
        )}

        <Box className={classes.content}>
          {isLoadingCertificates ? (
            <Loading />
          ) : (
            <>
              {certificates.length === 0 && (
                <EmptyPlaceholder
                  emptyListMessage={t('emptyListMessage')}
                  icon={<VerifiedUserOutlined fontSize='large' />}
                  handleButtonClick={() => history.push('/certificates/new')}
                  textButton={t('createNewCertificate')}
                />
              )}

              {viewMode === VIEW_MODE.TABLE && certificates.length > 0 && (
                <DataTable
                  order={order}
                  orderBy={orderBy}
                  certificates={certificates}
                  selectedCertificates={selectedCertificates}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  handleSelectCertificate={setSelectedCertificates}
                  handleSetCertificateOptionsMenu={setCertificatesOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && certificates.length > 0 && (
                <Cards
                  order={order}
                  orderBy={orderBy}
                  certificates={certificates}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  handleSetCertificateOptionsMenu={setCertificatesOptionsMenu}
                  handleShowDevicesToAssociate={handleShowDevicesToAssociate}
                />
              )}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfPages={totalPages}
          numberOfSelectedCertificates={selectedCertificates.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Certificates;
