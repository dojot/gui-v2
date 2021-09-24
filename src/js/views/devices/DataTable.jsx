import React, { useState, useMemo } from 'react';

import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { Check, Close, MoreHoriz, Star, StarBorderOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DATA_ORDER } from '../../common/constants';
import DataTableHead from './DataTableHead';
import useStyles from './style';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === DATA_ORDER.DESC
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const DataTable = ({
  page,
  devices,
  rowsPerPage,
  selectedDevices,
  handleClickDevice,
  handleSelectDevice,
  handleFavoriteDevice,
  handleSetDeviceOptionsMenu,
}) => {
  const { t } = useTranslation('devices');
  const classes = useStyles();

  const [order, setOrder] = useState(DATA_ORDER.ASC);
  const [orderBy, setOrderBy] = useState('');

  const headCells = useMemo(
    () => [
      {
        id: 'id',
        label: t('dataTableHead.id'),
      },
      {
        id: 'name',
        label: t('dataTableHead.name'),
      },
      {
        id: 'attrsLength',
        label: t('dataTableHead.attrsLength'),
      },
      {
        id: 'lastUpdate',
        label: t('dataTableHead.lastUpdate'),
      },
      {
        id: 'hasCertificate',
        label: t('dataTableHead.hasCertificate'),
      },
      {
        id: 'actions',
        label: t('dataTableHead.actions'),
        disableOrderBy: true,
      },
    ],
    [t],
  );

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === DATA_ORDER.ASC;
    setOrder(isAsc ? DATA_ORDER.DESC : DATA_ORDER.ASC);
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelectedDevices = devices.map(row => row.id);
      handleSelectDevice(newSelectedDevices);
      return;
    }

    handleSelectDevice([]);
  };

  const handleSelectRow = id => {
    const selectedIndex = selectedDevices.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedDevices, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedDevices.slice(1));
    } else if (selectedIndex === selectedDevices.length - 1) {
      newSelected = newSelected.concat(selectedDevices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedDevices.slice(0, selectedIndex),
        selectedDevices.slice(selectedIndex + 1),
      );
    }

    handleSelectDevice(newSelected);
  };

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            className={classes.tableHead}
            order={order}
            orderBy={orderBy}
            cells={headCells}
            rowCount={devices.length}
            numSelected={selectedDevices.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {devices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order, orderBy))
              .map(device => {
                const isSelected = selectedDevices.indexOf(device.id) !== -1;

                const handleClickInThisDevice = () => {
                  handleClickDevice(device);
                };

                const handleSelectThisRow = () => {
                  handleSelectRow(device.id);
                };

                const handleFavoriteThisDevice = () => {
                  handleFavoriteDevice();
                };

                const handleShowOptionsMenu = e => {
                  handleSetDeviceOptionsMenu({
                    anchorElement: e.target,
                    device,
                  });
                };

                return (
                  <TableRow
                    key={device.name}
                    tabIndex={-1}
                    role='checkbox'
                    selected={isSelected}
                    aria-checked={isSelected}
                    onClick={handleClickInThisDevice}
                    hover
                  >
                    <TableCell onClick={handleStopPropagation}>
                      <Checkbox
                        color='primary'
                        checked={isSelected}
                        onChange={handleSelectThisRow}
                      />
                    </TableCell>

                    <TableCell onClick={handleStopPropagation}>
                      <Tooltip
                        title={t(device.favorite ? 'removeFromFavoriteTooltip' : 'favoriteTooltip')}
                        placement='right'
                        arrow
                      >
                        <Checkbox
                          color='primary'
                          checkedIcon={<Star />}
                          checked={device.favorite}
                          icon={<StarBorderOutlined />}
                          onChange={handleFavoriteThisDevice}
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell className={classes.clickableCell}>{device.id}</TableCell>
                    <TableCell className={classes.clickableCell}>{device.name}</TableCell>
                    <TableCell className={classes.clickableCell}>{device.attrsLength}</TableCell>
                    <TableCell className={classes.clickableCell}>{device.lastUpdate}</TableCell>

                    <TableCell className={classes.clickableCell}>
                      <Tooltip
                        title={t(
                          device.hasCertificate ? 'hasCertificateTooltip' : 'noCertificateTooltip',
                        )}
                        placement='right'
                        arrow
                      >
                        {device.hasCertificate ? (
                          <Check color='primary' />
                        ) : (
                          <Close color='error' />
                        )}
                      </Tooltip>
                    </TableCell>

                    <TableCell onClick={handleStopPropagation}>
                      <IconButton onClick={handleShowOptionsMenu}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataTable.propTypes = {
  devices: PropTypes.array,
  handleClickDevice: PropTypes.func,
  handleSelectDevice: PropTypes.func,
  handleFavoriteDevice: PropTypes.func,
  handleSetDeviceOptionsMenu: PropTypes.func,
};

DataTable.defaultProps = {
  devices: [],
  handleClickDevice: null,
  handleSelectDevice: null,
  handleFavoriteDevice: null,
  handleSetDeviceOptionsMenu: null,
};

export default DataTable;
