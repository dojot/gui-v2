import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { AlertDialog } from '../../common/components/Dialogs';
import { EmptyPlaceholder } from '../../common/components/EmptyPlaceholder';
import { CERTIFICATES_PAGE_KEYS, DATA_ORDER, VIEW_MODE } from '../../common/constants';
import { useIsLoading, usePersistentState } from '../../common/hooks';
import {
  actions as certificatesActions,
  constants as certificatesConstants,
} from '../../redux/modules/certificates';
import {
  certificatesSelector,
  paginationControlSelector,
} from '../../redux/selectors/certificatesSelector';
import { ViewContainer } from '../stateComponents';
import AssociateDevicesModal from './AssociateDevicesModal';
import Cards from './layout/Cards';
import CertificateOptionsMenu from './layout/CertificateOptionsMenu';
import CertificatesLoading from './layout/CertificatesLoading';
import DataTable from './layout/DataTable';
import MassActions from './layout/MassActions';
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState(DATA_ORDER.ASC);
  const [orderBy, setOrderBy] = useState('');

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
    dispatch(certificatesActions.getCertificates({ filter: { fingerprint: search } }));
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
      }),
    );
  }, [dispatch, page, rowsPerPage]);

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
      <AssociateDevicesModal
        isOpen={isShowingDevicesToAssociate}
        certificate={certificatesOptionsMenu?.certificate || {}}
        handleHideDevicesToAssociateModal={handleHideDevicesToAssociateModal}
      />

      <CertificateOptionsMenu
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
            <CertificatesLoading />
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
                  certificates={certificates}
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
