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
import { ArrowForwardIos } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from 'sharedComponents/DataTable';
import { DATA_ORDER, NEW_CHIP_HOURS_AGO } from 'sharedComponents/Constants';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
import { useDataTableStyles } from './style';
import DataTableRow from './DataTableRow';

const DataTable = ({
  order,
  orderBy,
  reports,
  selectedDevices,
  setSelectedDevices,
  setOrder,
  setOrderBy,
  handleClickDevice,
  handleSelectDevice,
  handleFavoriteDevice,
  handleSelectAttr,
  handleDeselectAttr,
  handleDeleteReport,
  handleDownloadFile,
}) => {
  const { t } = useTranslation(['myReports', 'common']);
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'label',
        label: t('dataTableHead.label'),
      },
      {
        id: 'requestDate',
        label: t('dataTableHead.requestDate'),
      },
      {
        id: 'dateAvailable',
        label: t('dataTableHead.dateAvailable'),
      },
      {
        id: 'expiresIn',
        label: t('dataTableHead.expiresIn'),
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

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            disableCheckbox
            className={classes.tableHead}
            order={order}
            orderBy={orderBy}
            cells={headCells}
            startExtraCells={<TableCell />}
            rowCount={reports.length}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {reports.map(report => (
              <DataTableRow
                report={report}
                handleStopPropagation={handleStopPropagation}
                handleDeleteReport={handleDeleteReport}
                handleDownloadFile={handleDownloadFile}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataTable.propTypes = {
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  reports: PropTypes.array.isRequired,
  selectedDevices: PropTypes.object.isRequired,
  setSelectedDevices: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleClickDevice: PropTypes.func.isRequired,
  handleFavoriteDevice: PropTypes.func.isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
};

export default DataTable;
