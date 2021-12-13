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
  Chip,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { DataTableHead } from '../../../common/components/DataTable';
import { DATA_ORDER } from '../../../common/constants';
import { getComparator } from '../../../common/utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  certificationAuthorities,
  selectedCertificationAuthorities,
  setOrder,
  setOrderBy,
  handleSelectAuthority,
}) => {
  const { t } = useTranslation('certificationAuthorities');
  const classes = useDataTableStyles();
  const dispatch = useDispatch();

  const headCells = useMemo(
    () => [
      {
        id: 'name',
        label: t('dataTableHead.label'),
      },
      {
        id: 'validityPeriod',
        label: t('dataTableHead.validityPeriod'),
      },
      {
        id: 'linkedCertificate',
        label: t('dataTableHead.linkedCertificate'),
      },
      {
        id: 'status',
        label: t('dataTableHead.status'),
      },
      {
        id: 'actions',
        label: t('dataTableHead.actions'),
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
      const newSelectedDevices = certificationAuthorities.map(row => row.id);
      handleSelectAuthority(newSelectedDevices);
      return;
    }

    handleSelectAuthority([]);
  };

  const handleSelectRow = id => {
    const selectedIndex = selectedCertificationAuthorities.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCertificationAuthorities, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCertificationAuthorities.slice(1));
    } else if (selectedIndex === selectedCertificationAuthorities.length - 1) {
      newSelected = newSelected.concat(selectedCertificationAuthorities.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCertificationAuthorities.slice(0, selectedIndex),
        selectedCertificationAuthorities.slice(selectedIndex + 1),
      );
    }

    handleSelectAuthority(newSelected);
  };

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  const handleDeleteAuthority = () => {
    dispatch({ type: 'delete' });
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
            rowCount={certificationAuthorities.length}
            numSelected={selectedCertificationAuthorities.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {certificationAuthorities
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy))
              .map(certificationAuthority => {
                const isSelected =
                  selectedCertificationAuthorities.indexOf(certificationAuthority.id) !== -1;

                const handleSelectThisRow = () => {
                  handleSelectRow(certificationAuthority.id);
                };

                return (
                  <TableRow
                    key={certificationAuthority.label}
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

                    <TableCell>{certificationAuthority.name}</TableCell>

                    <TableCell>
                      {certificationAuthority.validityPeriodStart} -{' '}
                      {certificationAuthority.validityPeriodEnd}
                    </TableCell>

                    <TableCell className={classes.linkedCertificate}>
                      {certificationAuthority.linkedCertificate}
                    </TableCell>

                    <TableCell>
                      {certificationAuthority.status === 'valid' && (
                        <Chip
                          label={t('dataTableBody.status.valid')}
                          className={classes.statusValid}
                        />
                      )}

                      {certificationAuthority.status === 'expired' && (
                        <Chip
                          label={t('dataTableBody.status.expired')}
                          className={classes.statusExpired}
                        />
                      )}

                      {certificationAuthority.status === 'to_expire' && (
                        <Chip
                          label={t('dataTableBody.status.to_expire')}
                          className={classes.statusToExpire}
                        />
                      )}
                    </TableCell>

                    <TableCell onClick={handleStopPropagation}>
                      <IconButton onClick={() => handleDeleteAuthority()}>
                        <Delete />
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
  certificationAuthorities: PropTypes.array.isRequired,
  selectedCertificationAuthorities: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleSelectAuthority: PropTypes.func.isRequired,
};

export default DataTable;
