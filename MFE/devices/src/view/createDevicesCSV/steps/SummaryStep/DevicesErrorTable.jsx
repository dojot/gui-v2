import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSummaryStepStyles } from './style';

const DevicesErrorTable = ({ notCreatedDevices }) => {
  const classes = useSummaryStepStyles();
  const { t } = useTranslation('createDevicesCSV');

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>{t('summaryStep.tableHead.devices')}</TableCell>
          <TableCell>{t('summaryStep.tableHead.error')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {notCreatedDevices.map(device => (
          <TableRow className={classes.tableRow} key={device.label}>
            <TableCell>{device.label}</TableCell>
            <TableCell>{device.errorMessage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

DevicesErrorTable.propTypes = {
  notCreatedDevices: PropTypes.array.isRequired,
};

export default DevicesErrorTable;
