import React, { useMemo } from 'react';

import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import {
  Block,
  Check,
  CheckCircle,
  Close,
  MoreHoriz,
  Star,
  StarBorderOutlined,
} from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from 'sharedComponents/DataTable';
import { CopyTextToClipboardButton } from 'sharedComponents/CopyTextToClipboardButton';
import { DATA_ORDER, NEW_CHIP_HOURS_AGO } from 'sharedComponents/Constants';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
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
  const { t } = useTranslation(['devices', 'common']);
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'label',
        label: t('dataTableHead.label'),
      },
      {
        id: 'id',
        label: t('dataTableHead.id'),
      },
      {
        id: 'created',
        label: t('dataTableHead.created'),
      },
      {
        id: 'updated',
        label: t('dataTableHead.updated'),
      },
      {
        id: 'attrsLength',
        label: t('dataTableHead.attrsLength'),
        disableOrderBy: true,
      },
      {
        id: 'hasCertificate',
        label: t('dataTableHead.hasCertificate'),
        disableOrderBy: true,
      },
      {
        id: 'status',
        label: t('dataTableHead.status'),
        disableOrderBy: true,
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
    const isSameProperty = orderBy === property;
    if (isSameProperty) {
      const isAsc = order === DATA_ORDER.ASC;
      setOrder(isAsc ? DATA_ORDER.DESC : DATA_ORDER.ASC);
      setOrderBy(isAsc ? property : '');
    } else {
      setOrder(DATA_ORDER.ASC);
      setOrderBy(property);
    }
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelectedDevices = devices.map(row => row);
      handleSelectDevice(newSelectedDevices);
      return;
    }

    handleSelectDevice([]);
  };

  const handleSelectRow = device => {
    const selectedIndex = selectedDevices.indexOf(device);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedDevices, device);
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
            startExtraCells={<TableCell />}
            numSelected={selectedDevices.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {devices.map(device => {
              const hasCertificate = !!device.certificate?.fingerprint;
              const isNew = isSomeHoursAgo(device.created, NEW_CHIP_HOURS_AGO);
              const isSelected = selectedDevices.some(
                selectedDevice => selectedDevice.id === device.id,
              );

              const handleClickInThisDevice = () => {
                handleClickDevice(device);
              };

              const handleSelectThisRow = () => {
                handleSelectRow(device);
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
                  key={device.id}
                  tabIndex={-1}
                  role='checkbox'
                  selected={isSelected}
                  aria-checked={isSelected}
                  onClick={handleClickInThisDevice}
                  hover
                >
                  <TableCell onClick={handleStopPropagation}>
                    <Checkbox
                      color='secondary'
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
                        color='default'
                        icon={<StarBorderOutlined />}
                        checkedIcon={<Star style={{ color: '#F1B44C' }} />}
                        defaultChecked={device.favorite}
                        onChange={handleFavoriteThisDevice}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    <Box mr={isNew ? 1 : 0} component='span'>
                      {device.label}
                    </Box>

                    {isNew && <Chip color='primary' label={t('common:new')} size='small' />}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    {device.id}
                    &nbsp;
                    <CopyTextToClipboardButton textToCopy={device.id} />
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    {device.created ? moment(device.created).format('L LTS') : ''}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    {device.updated ? moment(device.updated).format('L LTS') : ''}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    {device.attrs?.length || 0}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    <Tooltip
                      title={t(hasCertificate ? 'hasCertificateTooltip' : 'noCertificateTooltip')}
                      placement='right'
                      arrow
                    >
                      {hasCertificate ? <Check color='primary' /> : <Close color='error' />}
                    </Tooltip>
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    <Tooltip
                      title={t(device.disabled ? 'disabledTooltip' : 'enabledTooltip')}
                      placement='right'
                      arrow
                    >
                      {device.disabled ? (
                        <Block color='error' />
                      ) : (
                        <CheckCircle color='secondary' />
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
