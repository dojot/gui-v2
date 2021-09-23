import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { ViewContainer } from '../stateComponents';
import Cards from './Cards';
import { VIEW_MODE } from './constants';
import DataTable from './DataTable';
import DeviceDetailsModal from './DeviceDetailsModal';
import MassActions from './MassActions';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import useStyles from './style';

const Devices = () => {
  const { t } = useTranslation('devices');
  const history = useHistory();
  const classes = useStyles();

  const [devices] = useState([1, 2, 3, 4, 5, 6]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState(VIEW_MODE.CARD);
  const [clickedDevice, setClickedDevice] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isShowingMassActions, setIsShowingMassActions] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleHideDetailsModal = () => {
    setClickedDevice(null);
  };

  const handleHideMassActions = () => {
    setIsShowingMassActions(false);
  };

  const handleCreateCertificates = () => {
    history.push('/certificates');
  };

  const handleDeleteAllDevices = () => {
    console.log('Delete All');
  };

  const handleSelectDevice = device => {
    setSelectedDevices(currentSelectedDevices => {
      const selectedDevicesClone = [...currentSelectedDevices, device];
      const selectedDevicesSet = new Set(selectedDevicesClone);
      return Array.from(selectedDevicesSet);
    });
  };

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <DeviceDetailsModal
        isOpen={!!clickedDevice}
        deviceDetails={clickedDevice}
        handleHideDetailsModal={handleHideDetailsModal}
      />

      <Box className={classes.container}>
        <SearchBar handleChangeViewMode={setViewMode} viewMode={viewMode} />

        {isShowingMassActions && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteAllDevices={handleDeleteAllDevices}
            handleCreateCertificates={handleCreateCertificates}
          />
        )}

        <Box className={classes.content}>
          {viewMode === VIEW_MODE.TABLE ? (
            <DataTable
              devices={devices}
              handleClickDevice={setClickedDevice}
              handleSelectDevice={handleSelectDevice}
            />
          ) : (
            <Cards devices={devices} handleClickDevice={setClickedDevice} />
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfDevices={devices.length}
          numberOfSelectedDevices={selectedDevices.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Devices;
