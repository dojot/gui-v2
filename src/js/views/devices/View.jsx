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

const FAKE_DEVICES = [
  {
    id: '1',
    name: 'Dispositivo 1',
    lastUpdate: '02/03/2020 15:33:33',
    attrsLength: 1,
    hasCertificate: true,
    favorite: true,
  },
  {
    id: '2',
    name: 'Dispositivo 2',
    lastUpdate: '02/03/2020 15:33:33',
    attrsLength: 2,
    hasCertificate: false,
  },
  {
    id: '3',
    name: 'Dispositivo 3',
    lastUpdate: '02/03/2020 15:33:33',
    attrsLength: 3,
    hasCertificate: true,
    favorite: true,
  },
  {
    id: '4',
    name: 'Dispositivo 4',
    lastUpdate: '02/03/2020 15:33:33',
    attrsLength: 4,
    hasCertificate: false,
    favorite: true,
  },
  {
    id: '5',
    name: 'Dispositivo 5',
    lastUpdate: '02/03/2020 15:33:33',
    attrsLength: 5,
    hasCertificate: true,
  },
  {
    id: '6',
    name: 'Dispositivo 6',
    lastUpdate: '02/03/2020 15:33:33',
    attrsLength: 6,
    hasCertificate: true,
  },
];

const Devices = () => {
  const { t } = useTranslation('devices');
  const history = useHistory();
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [devices] = useState(FAKE_DEVICES);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clickedDevice, setClickedDevice] = useState(null);
  const [viewMode, setViewMode] = useState(VIEW_MODE.TABLE);
  const [selectedDevices, setSelectedDevices] = useState([]);

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
    setSelectedDevices([]);
  };

  const handleCreateCertificates = () => {
    history.push('/certificates');
  };

  const handleDeleteAllDevices = () => {
    console.log('Delete All');
  };

  const handleFavoriteDevice = () => {
    console.log('Favorite Device');
  };

  const handleFavoriteAllDevices = () => {
    console.log('Favorite Device');
  };

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <DeviceDetailsModal
        isOpen={!!clickedDevice}
        deviceDetails={clickedDevice || {}}
        handleHideDetailsModal={handleHideDetailsModal}
      />

      <Box className={classes.container}>
        <SearchBar handleChangeViewMode={setViewMode} viewMode={viewMode} />

        {selectedDevices.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteAllDevices={handleDeleteAllDevices}
            handleCreateCertificates={handleCreateCertificates}
            handleFavoriteAllDevices={handleFavoriteAllDevices}
          />
        )}

        <Box className={classes.content}>
          {viewMode === VIEW_MODE.TABLE ? (
            <DataTable
              page={page}
              devices={devices}
              rowsPerPage={rowsPerPage}
              selectedDevices={selectedDevices}
              handleClickDevice={setClickedDevice}
              handleSelectDevice={setSelectedDevices}
              handleFavoriteDevice={handleFavoriteDevice}
            />
          ) : (
            <Cards
              page={page}
              devices={devices}
              rowsPerPage={rowsPerPage}
              handleClickDevice={setClickedDevice}
            />
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
