import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { isNumber } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DevicesOther } from '@material-ui/icons';

import { DATA_ORDER, ROWS_PER_PAGE_OPTIONS } from 'sharedComponents/Constants';
import { useIsLoading, useSearchParamState } from 'sharedComponents/Hooks';
import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import { actions as deviceActions, constants } from '../../redux/modules/devices';
import { devicesSelector, paginationControlSelector } from '../../redux/selectors/devicesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import DataTable from './layout/DataTable';
import DevicesLoading from './layout/DevicesLoading';
import MassActions from './layout/MassActions';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
import CreateDevicesOptionsMenu from './layout/CreateDevicesOptionsMenu';

const CreateReport = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const { t } = useTranslation('createReport');
  const devices = useSelector(devicesSelector);
  const isLoadingDevices = useIsLoading(constants.GET_DEVICES);
  const { totalPages } = useSelector(paginationControlSelector);

  const [selectedDevices, setSelectedDevices] = useState({});
  const [createDevicesOptionsMenu, setCreateDevicesOptionsMenu] = useState(null);

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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    return () => {
      dispatch(deviceActions.updateDevices({ devices: [] }));
    };
  }, [dispatch]);

  return (
    <>
      <ViewContainer headerTitle={t('title')}>
        <CreateDevicesOptionsMenu
          anchorElement={createDevicesOptionsMenu}
          handleClose={handleCloseCreationDevicseMenu}
        />

        <Box className={classes.container}>
          <SearchBar lastSearchedText={searchText} handleSearchDevice={handleSearchDevice} />

          {Object.keys(selectedDevices).length > 0 && (
            <MassActions
              numberOfSelectedDevices={Object.keys(selectedDevices).length}
              selectedDevices={selectedDevices}
            />
          )}

          <Box className={classes.content}>
            {isLoadingDevices && <DevicesLoading />}

            {devices.length > 0 && (
              <DataTable
                order={order}
                orderBy={orderBy}
                devices={devices}
                selectedDevices={selectedDevices}
                setSelectedDevices={setSelectedDevices}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
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
          </Box>

          <Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            totalOfPages={totalPages}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </ViewContainer>
    </>
  );
};

export default CreateReport;
