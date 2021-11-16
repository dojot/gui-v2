import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { AlertDialog } from '../../common/components/Dialogs';
import { DEVICES_PAGE_KEYS, VIEW_MODE } from '../../common/constants';
import { usePersistentState } from '../../common/hooks';
import { actions as certificatesActions } from '../../redux/modules/certificates';
import {
  certificatesSelector,
  paginationControlSelector,
  loadingCertificatesSelector,
} from '../../redux/selectors/certificatesSelector';
import { ViewContainer } from '../stateComponents';
import AssociateDevicesModal from './layout/AssociateDevicesModal';
import Cards from './layout/Cards';
import CertificateOptionsMenu from './layout/CertificateOptionsMenu';
import CertificatesLoading from './layout/CertificatesLoading';
import DataTable from './layout/DataTable';
import EmptyCertificatesList from './layout/EmptyCertificatesList';
import MassActions from './layout/MassActions';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Certificates = () => {
  const { t } = useTranslation('certificates');
  const classes = useStyles();
  const dispatch = useDispatch();
  const certificates = useSelector(certificatesSelector);
  const isLoadingCertificates = useSelector(loadingCertificatesSelector);
  const { totalPages } = useSelector(paginationControlSelector);
  const [certificatesOptionsMenu, setCertificatesOptionsMenu] = useState(null);
  const [isShowingDevicesToAssociate, setIsShowingDevicesToAssociate] = useState(false);
  const [clickedCertificate, setClickedCertificate] = useState(null);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [isShowingDisassociateDeviceAlert, setIsShowingDisassociateDeviceAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: DEVICES_PAGE_KEYS.VIEW_MODE,
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchCertificate = search => {
    dispatch(certificatesActions.getCertificates({ filter: { label: search } }));
  };

  const handleHideOptionsMenu = () => {
    setCertificatesOptionsMenu(null);
  };

  const handleHideDevicesToAssociateModal = () => {
    setIsShowingDevicesToAssociate(false);
  };

  const handleShowDevicesToAssociate = certificate => {
    setClickedCertificate(certificate);
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
  };

  const handleConfirmCertificateDeletion = () => {
    const certificateId = certificatesOptionsMenu.certificate.id;
    dispatch(certificatesActions.deleteCertificate({ certificateId }));
    setSelectedCertificates(currentSelectedDevices => {
      return currentSelectedDevices.filter(id => id !== certificateId);
    });
  };

  const handleConfirmMultipleCertificatesDeletion = () => {
    dispatch(
      certificatesActions.deleteMultipleCertificates({ certificatesIdArray: selectedCertificates }),
    );
    setIsShowingMultipleDeleteAlert(false);
    handleHideMassActions();
  };

  const handleConfirmDisassociateDevice = () => {
    console.log(certificatesOptionsMenu.certificate);
    dispatch(
      certificatesActions.disassociateDevice({ certificate: certificatesOptionsMenu.certificate }),
    );
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

  return (
    <ViewContainer headerTitle='Certificados'>
      <AssociateDevicesModal
        isOpen={isShowingDevicesToAssociate}
        deviceDetails={clickedCertificate || {}}
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
        cancelButtonText='deleteMultipleCertificatesAlert.cancelButton'
        confirmButtonText='deleteMultipleCertificatesAlert.confirmButton'
      />

      <AlertDialog
        isOpen={isShowingDisassociateDeviceAlert}
        title={t('disassociateDeviceAlert.title', {
          deviceId: certificatesOptionsMenu?.certificate.deviceId,
        })}
        message={t('disassociateDeviceAlert.message', {
          deviceId: certificatesOptionsMenu?.certificate.deviceId,
          certificateLabel: certificatesOptionsMenu?.certificate.label,
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
              {certificates.length === 0 && <EmptyCertificatesList />}

              {viewMode === VIEW_MODE.TABLE && certificates.length > 0 && (
                <DataTable
                  rowsPerPage={rowsPerPage}
                  selectedCertificates={selectedCertificates}
                  page={page}
                  certificates={certificates}
                  handleSetCertificateOptionsMenu={setCertificatesOptionsMenu}
                  handleShowDevicesToAssociate={handleShowDevicesToAssociate}
                  handleSelectCertificate={setSelectedCertificates}
                />
              )}

              {viewMode === VIEW_MODE.CARD && certificates.length > 0 && (
                <Cards
                  rowsPerPage={rowsPerPage}
                  page={page}
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
          totalOfDevices={totalPages}
          numberOfSelectedCertificates={selectedCertificates.length}
          totalOfCertificates={certificates.length}
          numberOfSelectedDevices={selectedCertificates.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Certificates;
