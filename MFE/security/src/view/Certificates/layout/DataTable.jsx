import React, { useCallback, useMemo } from 'react';

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
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DATA_ORDER, NEW_CHIP_HOURS_AGO, EVENT } from 'sharedComponents/Constants';
import { CopyTextToClipboardButton } from 'sharedComponents/CopyTextToClipboardButton';
import { DataTableHead } from 'sharedComponents/DataTable';
import { useCertificateComputedData, dispatchEvent } from 'sharedComponents/Hooks';
import { isSomeHoursAgo } from 'sharedComponents/Utils';

import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  certificates,
  selectedCertificates,
  setOrder,
  setOrderBy,
  handleSelectCertificate,
  handleSetCertificateOptionsMenu,
}) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useDataTableStyles();

  const handleGetCertificateComputedData = useCertificateComputedData();

  const headCells = useMemo(
    () => [
      {
        id: 'fingerprint',
        label: t('dataLabels.fingerprint'),
      },
      {
        id: 'subjectDN',
        label: t('dataLabels.subjectDN'),
      },
      {
        id: 'deviceId',
        label: t('dataLabels.deviceId'),
        disableOrderBy: true,
      },
      {
        id: 'validity.notBefore',
        label: t('dataLabels.validity.notBefore'),
      },
      {
        id: 'validity.notAfter',
        label: t('dataLabels.validity.notAfter'),
      },
      {
        id: 'status',
        label: t('dataLabels.status'),
        disableOrderBy: true,
      },
      {
        id: 'actions',
        label: t('dataLabels.actions'),
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
      const newSelectedCertificates = certificates.map(row => row.fingerprint);
      handleSelectCertificate(newSelectedCertificates);
      return;
    }

    handleSelectCertificate([]);
  };

  const handleSelectRow = id => {
    const selectedIndex = selectedCertificates.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCertificates, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCertificates.slice(1));
    } else if (selectedIndex === selectedCertificates.length - 1) {
      newSelected = newSelected.concat(selectedCertificates.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCertificates.slice(0, selectedIndex),
        selectedCertificates.slice(selectedIndex + 1),
      );
    }

    handleSelectCertificate(newSelected);
  };

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  const handleClick = useCallback(certificate => {
    dispatchEvent(EVENT.CHANGE_ROUTE, { pathname: `/devices/${certificate.belongsTo.device}` });
  }, []);

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            className={classes.tableHead}
            order={order}
            orderBy={orderBy}
            cells={headCells}
            rowCount={certificates.length}
            numSelected={selectedCertificates.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {certificates.map(certificate => {
              const isSelected = selectedCertificates.indexOf(certificate.fingerprint) !== -1;
              const isNew = isSomeHoursAgo(certificate.createdAt, NEW_CHIP_HOURS_AGO);

              const { statusText, statusColor, validityInitialDate, validityFinalDate } =
                handleGetCertificateComputedData(certificate.validity);

              const handleSelectThisRow = () => {
                handleSelectRow(certificate.fingerprint);
              };

              const handleShowOptionsMenu = e => {
                handleSetCertificateOptionsMenu({
                  anchorElement: e.target,
                  certificate,
                });
              };

              return (
                <TableRow
                  key={certificate.fingerprint}
                  tabIndex={-1}
                  role='checkbox'
                  selected={isSelected}
                  aria-checked={isSelected}
                  hover
                >
                  <TableCell onClick={handleStopPropagation}>
                    <Checkbox
                      color='secondary'
                      checked={isSelected}
                      onChange={handleSelectThisRow}
                    />
                  </TableCell>

                  <TableCell>
                    <Box className={classes.fingerprintField}>
                      <Tooltip
                        title={certificate.fingerprint}
                        classes={{ tooltip: classes.tooltip }}
                        placement='right'
                        arrow
                      >
                        <div className={classes.truncatedText}>{certificate.fingerprint}</div>
                      </Tooltip>

                      <CopyTextToClipboardButton textToCopy={certificate.fingerprint} />

                      {isNew && (
                        <Box ml={0.5}>
                          <Chip color='primary' label={t('common:new')} size='small' />
                        </Box>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Tooltip
                      title={certificate.subjectDN}
                      classes={{ tooltip: classes.tooltip }}
                      placement='right'
                      interactive
                      arrow
                    >
                      <div className={classes.truncatedText}>{certificate.subjectDN}</div>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    {certificate.belongsTo?.device ? (
                      <div
                        tabIndex={0}
                        role='link'
                        onKeyDown={() => handleClick(certificate)}
                        onClick={() => handleClick(certificate)}
                        className={classes.deviceIdLink}
                      >
                        {certificate.belongsTo.device}
                      </div>
                    ) : (
                      t('dataTableBody.noDeviceAssociated')
                    )}
                  </TableCell>

                  <TableCell>{validityInitialDate}</TableCell>

                  <TableCell>{validityFinalDate}</TableCell>

                  <TableCell>
                    <Chip
                      style={{ background: statusColor, color: '#22252F' }}
                      label={statusText}
                      size='small'
                    />
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
  certificates: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleSelectCertificate: PropTypes.func.isRequired,
  handleSetCertificateOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
