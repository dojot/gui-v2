import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { DEVICES_PAGE_KEYS, VIEW_MODE } from '../../common/constants';
import { usePersistentState } from '../../common/hooks';
import { actions as deviceActions } from '../../redux/modules/devices';
import {
  loadingDevicesSelector,
  paginationControlSelector,
  devicesWithAttrLengthSelector,
} from '../../redux/selectors/devicesSelector';
import { ViewContainer } from '../stateComponents';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import DeviceDetailsModal from './layout/DeviceDetailsModal';
import DeviceOptionsMenu from './layout/DeviceOptionsMenu';
import DevicesLoading from './layout/DevicesLoading';
import EmptyDeviceList from './layout/EmptyDeviceList';
import MassActions from './layout/MassActions';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Devices = () => {
  const { t } = useTranslation('devices');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const devices = useSelector(devicesWithAttrLengthSelector);
  const isLoadingDevices = useSelector(loadingDevicesSelector);
  const { totalPages } = useSelector(paginationControlSelector);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: DEVICES_PAGE_KEYS.VIEW_MODE,
  });

  const [clickedDevice, setClickedDevice] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [deviceOptionsMenu, setDeviceOptionsMenu] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleHideDetailsModal = () => {
    setIsShowingDetails(false);
  };

  const handleClickDevice = device => {
    setClickedDevice(device);
    setIsShowingDetails(true);
  };

  const handleHideMassActions = () => {
    setSelectedDevices([]);
  };

  const handleFavoriteAllDevices = () => {
    handleHideMassActions();
    const deviceIdArray = selectedDevices.map(({ id }) => id);
    dispatch(deviceActions.favoriteAllDevices({ deviceIdArray }));
  };

  const handleCreateCertificates = () => {
    history.push('/certificates');
  };

  const handleDeleteAllDevices = () => {
    handleHideMassActions();
    const deviceIdArray = selectedDevices.map(({ id }) => id);
    dispatch(deviceActions.deleteAllDevices({ deviceIdArray }));
  };

  const handleFavoriteDevice = device => {
    const deviceId = device.id;
    dispatch(deviceActions.deleteDevice({ deviceId }));
  };

  const handleHideOptionsMenu = () => {
    setDeviceOptionsMenu(null);
  };

  const handleEditDevice = () => {
    handleHideOptionsMenu();
    const deviceId = deviceOptionsMenu.device.id;
    history.push(`/create-device/${deviceId}`);
  };

  const handleDeleteDevice = () => {
    handleHideOptionsMenu();
    const deviceId = deviceOptionsMenu.device.id;
    dispatch(deviceActions.deleteDevice({ deviceId }));
  };

  const handleSearchDevice = search => {
    dispatch(deviceActions.getDevices({ filter: { label: search } }));
  };

  useEffect(() => {
    dispatch(
      deviceActions.getDevices({
        page: {
          number: page,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    if (viewMode) setSelectedDevices([]);
  }, [viewMode]);

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <DeviceDetailsModal
        isOpen={isShowingDetails}
        deviceDetails={clickedDevice || {}}
        handleHideDetailsModal={handleHideDetailsModal}
      />

      <DeviceOptionsMenu
        isShowingMenu={!!deviceOptionsMenu}
        anchorElement={deviceOptionsMenu?.anchorElement}
        handleEditDevice={handleEditDevice}
        handleDeleteDevice={handleDeleteDevice}
        handleHideOptionsMenu={handleHideOptionsMenu}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          handleChangeViewMode={setViewMode}
          handleSearchDevice={handleSearchDevice}
        />

        {selectedDevices.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteAllDevices={handleDeleteAllDevices}
            handleCreateCertificates={handleCreateCertificates}
            handleFavoriteAllDevices={handleFavoriteAllDevices}
          />
        )}

        <Box className={classes.content}>
          {isLoadingDevices ? (
            <DevicesLoading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && devices.length > 0 && (
                <DataTable
                  page={page}
                  devices={devices}
                  rowsPerPage={rowsPerPage}
                  selectedDevices={selectedDevices}
                  handleClickDevice={handleClickDevice}
                  handleSelectDevice={setSelectedDevices}
                  handleFavoriteDevice={handleFavoriteDevice}
                  handleSetDeviceOptionsMenu={setDeviceOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && devices.length > 0 && (
                <Cards
                  page={page}
                  devices={devices}
                  rowsPerPage={rowsPerPage}
                  handleClickDevice={handleClickDevice}
                  handleFavoriteDevice={handleFavoriteDevice}
                  handleSetDeviceOptionsMenu={setDeviceOptionsMenu}
                />
              )}

              {devices.length === 0 && <EmptyDeviceList />}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfDevices={totalPages}
          numberOfSelectedDevices={selectedDevices.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Devices;
