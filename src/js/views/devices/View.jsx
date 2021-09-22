import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../stateComponents';
import Cards from './Cards';
import { VIEW_MODE } from './constants';
import DataTable from './DataTable';
import DeviceDetailsModal from './DeviceDetailsModal';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import useStyles from './style';

const Devices = () => {
  const { t } = useTranslation('devices');
  const classes = useStyles();

  const [devices] = useState([1, 2, 3, 4, 5, 6]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState(VIEW_MODE.CARD);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleHideDetailsModal = () => {
    setSelectedDevice(null);
  };

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <DeviceDetailsModal
        isOpen={!!selectedDevice}
        deviceDetails={selectedDevice}
        handleHideDetailsModal={handleHideDetailsModal}
      />

      <Box className={classes.container}>
        <SearchBar handleChangeViewMode={setViewMode} viewMode={viewMode} />

        <Box className={classes.content}>
          {viewMode === VIEW_MODE.TABLE ? (
            <DataTable devices={devices} handleSelectDevice={setSelectedDevice} />
          ) : (
            <Cards devices={devices} handleSelectDevice={setSelectedDevice} />
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfDevices={devices.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Devices;
