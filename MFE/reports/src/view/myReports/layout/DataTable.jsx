import React, { useMemo } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DataTableHead } from 'sharedComponents/DataTable';
import { DATA_ORDER } from 'sharedComponents/Constants';
import DataTableRow from './DataTableRow';
import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  reports,
  setOrder,
  setOrderBy,
  handleDeleteReport,
  handleDownloadFile,
  handleOpenErrorAlert,
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
                key={report.id}
                report={report}
                handleStopPropagation={handleStopPropagation}
                handleDeleteReport={handleDeleteReport}
                handleDownloadFile={handleDownloadFile}
                handleOpenErrorAlert={handleOpenErrorAlert}
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
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
  handleDownloadFile: PropTypes.func.isRequired,
  handleOpenErrorAlert: PropTypes.func.isRequired,
};

export default DataTable;
