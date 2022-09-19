import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { DevicesOther } from '@material-ui/icons';
import { isNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import {
  DATA_ORDER,
  DEVICES_PAGE_KEYS,
  ROWS_PER_PAGE_OPTIONS,
  VIEW_MODE,
} from 'sharedComponents/Constants';
import { useIsLoading, usePersistentState, useSearchParamState } from 'sharedComponents/Hooks';
import { actions as deviceActions, constants } from '../../redux/modules/devices';
import { devicesSelector, paginationControlSelector } from '../../redux/selectors/devicesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import DeviceOptionsMenu from './layout/DeviceOptionsMenu';
import DevicesLoading from './layout/DevicesLoading';
import MassActions from './layout/MassActions';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';
import CreateDevicesOptionsMenu from './layout/CreateDevicesOptionsMenu';

const Devices = () => {
  const { t } = useTranslation('devices');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const devices = useSelector(devicesSelector);
  const isLoadingDevices = useIsLoading(constants.GET_DEVICES);
  const { totalPages } = useSelector(paginationControlSelector);

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
    key: DEVICES_PAGE_KEYS.VIEW_MODE,
  });

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceOptionsMenu, setDeviceOptionsMenu] = useState(null);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);

  const [createDevicesOptionsMenu, setCreateDevicesOptionsMenu] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickDevice = device => {
    const deviceId = device.id;
    history.push(`/devices/${deviceId}`);
  };

  const handleHideMassActions = () => {
    setSelectedDevices([]);
  };

  const handleCreateCertificates = () => {
    history.push('/certificates');
  };

  const handleDeleteMultipleDevices = () => {
    setIsShowingMultipleDeleteAlert(true);
  };

  const handleConfirmMultipleDevicesDeletion = () => {
    dispatch(deviceActions.deleteMultipleDevices({ deviceIdArray: selectedDevices }));
    handleHideMassActions();
  };

  const handleCloseMultipleDeviceDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleFavoriteDevice = device => {
    const deviceId = device.id;
    dispatch(deviceActions.favoriteDevice({ deviceId }));
  };

  const handleHideOptionsMenu = () => {
    setDeviceOptionsMenu(null);
  };

  const handleEditDevice = () => {
    handleHideOptionsMenu();
    const deviceId = deviceOptionsMenu.device.id;
    history.push(`/devices/edit/${deviceId}`);
  };

  const handleDeleteDevice = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleConfirmDeviceDeletion = () => {
    const deviceId = deviceOptionsMenu.device.id;
    dispatch(deviceActions.deleteDevice({ deviceId }));
    setSelectedDevices(currentSelectedDevices => {
      return currentSelectedDevices.filter(id => id !== deviceId);
    });
  };

  const handleCloseDeviceDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleSearchDevice = search => {
    setPage(0);
    setSearchText(search);
  };

  const handleOpenCreationDevicesMenu = event => {
    setCreateDevicesOptionsMenu(event.currentTarget);
  };

  const handleCloseCreationDevicseMenu = () => {
    setCreateDevicesOptionsMenu(null);
  };

  useEffect(() => {
    dispatch(
      deviceActions.getDevices({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        filter: {
          label: searchText,
        },
        sortBy: orderBy ? `${order}:${orderBy}` : undefined,
      }),
    );
  }, [dispatch, searchText, order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    if (viewMode) setSelectedDevices([]);
  }, [viewMode]);

  useEffect(() => {
    return () => {
      dispatch(deviceActions.updateDevices({ devices: [] }));
    };
  }, [dispatch]);

  return (
    <>
      <ViewContainer headerTitle={t('devices:title')}>
        <DeviceOptionsMenu
          isShowingMenu={!!deviceOptionsMenu}
          anchorElement={deviceOptionsMenu?.anchorElement}
          handleEditDevice={handleEditDevice}
          handleDeleteDevice={handleDeleteDevice}
          handleHideOptionsMenu={handleHideOptionsMenu}
        />

        <CreateDevicesOptionsMenu
          anchorElement={createDevicesOptionsMenu}
          handleClose={handleCloseCreationDevicseMenu}
        />

        <AlertDialog
          isOpen={isShowingDeleteAlert}
          title={t('deleteDeviceAlert.title')}
          message={t('deleteDeviceAlert.message')}
          handleConfirm={handleConfirmDeviceDeletion}
          handleClose={handleCloseDeviceDeletionAlert}
          cancelButtonText={t('deleteDeviceAlert.cancelButton')}
          confirmButtonText={t('deleteDeviceAlert.confirmButton')}
        />

        <AlertDialog
          isOpen={isShowingMultipleDeleteAlert}
          title={t('deleteMultipleDeviceAlert.title')}
          message={t('deleteMultipleDeviceAlert.message')}
          handleConfirm={handleConfirmMultipleDevicesDeletion}
          handleClose={handleCloseMultipleDeviceDeletionAlert}
          cancelButtonText={t('deleteMultipleDeviceAlert.cancelButton')}
          confirmButtonText={t('deleteMultipleDeviceAlert.confirmButton')}
        />

        <Box className={classes.container}>
          <SearchBar
            viewMode={viewMode}
            lastSearchedText={searchText}
            handleChangeViewMode={setViewMode}
            handleSearchDevice={handleSearchDevice}
            handleClickCreateDevices={handleOpenCreationDevicesMenu}
          />

          {selectedDevices.length > 0 && (
            <MassActions
              handleHideMassActions={handleHideMassActions}
              handleCreateCertificates={handleCreateCertificates}
              handleDeleteMultipleDevices={handleDeleteMultipleDevices}
            />
          )}

          <Box className={classes.content}>
            {isLoadingDevices ? (
              <DevicesLoading />
            ) : (
              <>
                {viewMode === VIEW_MODE.TABLE && devices.length > 0 && (
                  <DataTable
                    order={order}
                    orderBy={orderBy}
                    devices={devices}
                    selectedDevices={selectedDevices}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    handleClickDevice={handleClickDevice}
                    handleSelectDevice={setSelectedDevices}
                    handleFavoriteDevice={handleFavoriteDevice}
                    handleSetDeviceOptionsMenu={setDeviceOptionsMenu}
                  />
                )}

                {viewMode === VIEW_MODE.CARD && devices.length > 0 && (
                  <Cards
                    order={order}
                    orderBy={orderBy}
                    devices={devices}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    handleClickDevice={handleClickDevice}
                    handleFavoriteDevice={handleFavoriteDevice}
                    handleSetDeviceOptionsMenu={setDeviceOptionsMenu}
                  />
                )}

                {devices.length === 0 && (
                  <EmptyPlaceholder
                    textButton={t('createNewDevice')}
                    emptyListMessage={t('emptyListMessage')}
                    icon={<DevicesOther fontSize='large' />}
                    handleButtonClick={handleOpenCreationDevicesMenu}
                  />
                )}
              </>
            )}
          </Box>

          <Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            totalOfPages={totalPages}
            numberOfSelectedDevices={selectedDevices.length}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </ViewContainer>
    </>
  );
};

export default Devices;
