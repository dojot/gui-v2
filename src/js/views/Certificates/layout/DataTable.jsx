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
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from '../../../common/components/DataTable';
import { DATA_ORDER } from '../../../common/constants';
import { getComparator } from '../../../common/utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  page,
  certificates,
  rowsPerPage,
  selectedCertificates,
  handleShowDevicesToAssociate,
  handleSelectCertificate,
  handleSetCertificateOptionsMenu,
}) => {
  const { t } = useTranslation('certificates');
  const classes = useDataTableStyles();

  const [order, setOrder] = useState(DATA_ORDER.ASC);
  const [orderBy, setOrderBy] = useState('');

  const headCells = useMemo(
    () => [
      {
        id: 'label',
        label: t('dataTableHead.label'),
      },
      {
        id: 'validityPeriod',
        label: t('dataTableHead.validityPeriod'),
      },
      {
        id: 'certificateId',
        label: t('dataTableHead.certificateId'),
      },
      {
        id: 'status',
        label: t('dataTableHead.status'),
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
      const newSelectedCertificates = certificates.map(row => row.id);
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
          />

          <TableBody>
            {certificates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy))
              .map(certificate => {
                const isSelected = selectedCertificates.indexOf(certificate.id) !== -1;

                const handleShowDeviceLinkedModal = () => {
                  handleShowDevicesToAssociate(certificate);
                };

                const handleSelectThisRow = () => {
                  handleSelectRow(certificate.id);
                };

                const handleShowOptionsMenu = e => {
                  handleSetCertificateOptionsMenu({
                    anchorElement: e.target,
                    certificate,
                  });
                };

                return (
                  <TableRow
                    key={certificate.label}
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

                    <TableCell>{certificate.label}</TableCell>
                    <TableCell>{certificate.validityPeriod}</TableCell>
                    <TableCell
                      className={certificate.deviceId && classes.clickableCell}
                      onClick={certificate.deviceId ? handleShowDeviceLinkedModal : null}
                    >
                      {certificate.deviceId
                        ? certificate.deviceId
                        : t('dataTableBody.notAssociated')}
                    </TableCell>
                    <TableCell>{certificate.status}</TableCell>

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
  certificates: PropTypes.array,
  handleShowDevicesToAssociate: PropTypes.func,
  handleSelectCertificate: PropTypes.func,
  handleSetCertificateOptionsMenu: PropTypes.func,
};

DataTable.defaultProps = {
  certificates: [],
  handleShowDevicesToAssociate: null,
  handleSelectCertificate: null,
  handleSetCertificateOptionsMenu: null,
};

export default DataTable;
