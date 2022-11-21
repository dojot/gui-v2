import React from 'react';
import { Table, TableHead, TableCell, TableRow, Collapse, Box } from '@material-ui/core';
import { Today } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDataTableStyles } from './style';
import moment from 'moment';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DeviceRow from './DeviceRow';

const ReportContent = ({ isOpen, report }) => {
  const classes = useDataTableStyles();
  const { t } = useTranslation('myReports');

  return (
    <TableRow
      className={clsx({
        [classes.dataTableRowCollapsed]: isOpen,
      })}
    >
      <TableCell style={{ margin: 0, padding: 0 }} colSpan={7}>
        <Collapse in={isOpen}>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell>
                    <Box className={classes.selectedFilters}>
                      {t('reportContent.selectedFilters')}
                      <Box className={classes.period}>
                        {report.initialDate && <Today />}
                        {report.initialDate && moment(report.initialDate).format('L LTS')}
                      </Box>
                      <Box className={classes.period}>
                        {report.finalDate && <Today />}
                        {report.finalDate && moment(report.finalDate).format('L LTS')}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
            </Table>

            <Table>
              {report.params.map(device => (
                <DeviceRow key={device.id} device={device} />
              ))}
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

ReportContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  report: PropTypes.object.isRequired,
};

export default ReportContent;
