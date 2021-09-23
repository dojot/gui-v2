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

import DataTableHead from './DataTableHead';
import useStyles from './style';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({
  page,
  devices,
  rowsPerPage,
  selectedDevices,
  handleClickDevice,
  handleSelectDevice,
  handleFavoriteDevice,
}) => {
  const { t } = useTranslation('devices');
  const classes = useStyles();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

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
        id: 'numberOfProperties',
        label: t('dataTableHead.numberOfProperties'),
      },
      {
        id: 'lastUpdate',
        label: t('dataTableHead.lastUpdate'),
      },
      {
        id: 'certificate',
        label: t('dataTableHead.certificate'),
      },
      {
        id: 'actions',
        label: t('dataTableHead.actions'),
      },
    ],
    [t],
  );

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
              .slice()
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(device => {
                const isSelected = selectedDevices.indexOf(device.id) !== -1;
                const hasCertificate = !!device.certificate;

                const handleClickInThisDevice = () => {
                  handleClickDevice(device);
                };

                const handleStopPropagation = e => {
                  e.stopPropagation();
                };

                const handleSelectThisRow = () => {
                  handleSelectRow(device.id);
                };

                const handleShowOptions = () => {};

                const handleFavoriteThisDevice = () => {
                  handleFavoriteDevice();
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
                    <TableCell className={classes.clickableCell}>{device.attrs?.length}</TableCell>
                    <TableCell className={classes.clickableCell}>{device.lastUpdate}</TableCell>

                    <TableCell>
                      <Tooltip
                        title={t(hasCertificate ? 'hasCertificateTooltip' : 'noCertificateTooltip')}
                        placement='right'
                        arrow
                      >
                        {hasCertificate ? <Check /> : <Close />}
                      </Tooltip>
                    </TableCell>

                    <TableCell onClick={handleStopPropagation}>
                      <IconButton onClick={handleShowOptions}>
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
};

DataTable.defaultProps = {
  devices: [],
  handleClickDevice: null,
  handleSelectDevice: null,
  handleFavoriteDevice: null,
};

export default DataTable;
