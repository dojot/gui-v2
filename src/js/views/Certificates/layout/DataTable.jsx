import React, { useMemo } from 'react';

import {
  Checkbox,
  Chip,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { DataTableHead } from '../../../common/components/DataTable';
import { DATA_ORDER } from '../../../common/constants';
import { getComparator } from '../../../common/utils';
import { useCertificateComputedData } from '../hooks';
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
  const { t } = useTranslation('certificates');
  const classes = useDataTableStyles();

  const handleGetCertificateComputedData = useCertificateComputedData();

  const headCells = useMemo(
    () => [
      {
        id: 'fingerprint',
        label: t('dataLabels.fingerprint'),
      },
      {
        id: 'deviceId',
        label: t('dataLabels.deviceId'),
      },
      {
        id: 'validity',
        label: t('dataLabels.validity'),
      },
      {
        id: 'status',
        label: t('dataLabels.status'),
      },
      {
        id: 'actions',
        label: t('dataLabels.actions'),
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
            disableOrderBy
          />

          <TableBody>
            {certificates
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy))
              .map(certificate => {
                const isSelected = selectedCertificates.indexOf(certificate.fingerprint) !== -1;

                const {
                  statusText,
                  statusColor,
                  validityInitialDate,
                  validityFinalDate,
                } = handleGetCertificateComputedData(certificate.validity);

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
                        color='primary'
                        checked={isSelected}
                        onChange={handleSelectThisRow}
                      />
                    </TableCell>

                    <TableCell className={classes.truncatedFingerprint}>
                      {certificate.fingerprint}
                    </TableCell>

                    <TableCell>
                      {certificate.belongsTo?.device ? (
                        <RouterLink
                          component={Link}
                          href={`/devices/${certificate.belongsTo.device}`}
                        >
                          {certificate.belongsTo.device}
                        </RouterLink>
                      ) : (
                        t('dataTableBody.noDeviceAssociated')
                      )}
                    </TableCell>

                    <TableCell>
                      {validityInitialDate && validityFinalDate
                        ? `${validityInitialDate} - ${validityFinalDate}`
                        : t('validityNotDefined')}
                    </TableCell>

                    <TableCell>
                      <Chip
                        style={{ background: statusColor, color: 'white' }}
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
