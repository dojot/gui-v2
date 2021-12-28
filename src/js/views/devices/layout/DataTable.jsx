import React, { useMemo } from 'react';

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
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from '../../../common/components/DataTable';
import { DATA_ORDER } from '../../../common/constants';
import { getComparator } from '../../../common/utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  devices,
  selectedDevices,
  setOrder,
  setOrderBy,
  handleClickDevice,
  handleSelectDevice,
  handleFavoriteDevice,
  handleSetDeviceOptionsMenu,
}) => {
  const { t } = useTranslation('devices');
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'id',
        label: t('dataTableHead.id'),
      },
      {
        id: 'label',
        label: t('dataTableHead.label'),
      },
      {
        id: 'attrsLength',
        label: t('dataTableHead.attrsLength'),
      },
      {
        id: 'updated',
        label: t('dataTableHead.updated'),
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
            startExtraCells={false && <TableCell />} // TODO: Show again when you can favorite devices
            numSelected={selectedDevices.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {devices.sort(getComparator(order === DATA_ORDER.DESC, orderBy)).map(device => {
              const isSelected = selectedDevices.indexOf(device.id) !== -1;

              const handleClickInThisDevice = () => {
                handleClickDevice(device);
              };

              const handleSelectThisRow = () => {
                handleSelectRow(device.id);
              };

              const handleFavoriteThisDevice = () => {
                handleFavoriteDevice(device);
              };

              const handleShowOptionsMenu = e => {
                handleSetDeviceOptionsMenu({
                  anchorElement: e.target,
                  device,
                });
              };

              return (
                <TableRow
                  key={device.label}
                  tabIndex={-1}
                  role='checkbox'
                  selected={isSelected}
                  aria-checked={isSelected}
                  onClick={handleClickInThisDevice}
                  hover
                >
                  <TableCell onClick={handleStopPropagation}>
                    <Checkbox color='primary' checked={isSelected} onChange={handleSelectThisRow} />
                  </TableCell>

                  {false && (
                    // TODO: Show again when you can favorite devices
                    <TableCell onClick={handleStopPropagation}>
                      <Tooltip
                        title={t(device.favorite ? 'removeFromFavoriteTooltip' : 'favoriteTooltip')}
                        placement='right'
                        arrow
                      >
                        <Checkbox
                          color='default'
                          checked={device.favorite}
                          icon={<StarBorderOutlined />}
                          checkedIcon={<Star style={{ color: '#F1B44C' }} />}
                          onChange={handleFavoriteThisDevice}
                          disabled
                        />
                      </Tooltip>
                    </TableCell>
                  )}

                  <TableCell className={classes.clickableCell}>{device.id}</TableCell>
                  <TableCell className={classes.clickableCell}>{device.label}</TableCell>
                  <TableCell className={classes.clickableCell}>{device.attrsLength}</TableCell>

                  <TableCell className={classes.clickableCell}>
                    {moment(device.updated || device.created).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    <Tooltip
                      title={t(
                        device.hasCertificate ? 'hasCertificateTooltip' : 'noCertificateTooltip',
                      )}
                      placement='right'
                      arrow
                    >
                      {device.hasCertificate ? <Check color='primary' /> : <Close color='error' />}
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
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  devices: PropTypes.array.isRequired,
  selectedDevices: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleClickDevice: PropTypes.func.isRequired,
  handleSelectDevice: PropTypes.func.isRequired,
  handleFavoriteDevice: PropTypes.func.isRequired,
  handleSetDeviceOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
