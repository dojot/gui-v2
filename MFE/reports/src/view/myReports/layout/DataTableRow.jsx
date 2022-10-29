import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import {
  ChevronRight,
  ExpandMore,
  Delete,
  GetApp,
  HighlightOff,
  WarningTwoTone,
} from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ReportContent from './ReportContent';
import { useDataTableStyles } from './style';

const DataTableRow = ({ report, handleDeleteReport, handleDownloadFile }) => {
  const classes = useDataTableStyles();
  const { t } = useTranslation('myReports');

  const [isThisRowCollapsed, setIsThisRowCollapsed] = useState(false);

  const handleToggleCollapse = () => setIsThisRowCollapsed(prevState => !prevState);

  return (
    <React.Fragment key={report.id}>
      <TableRow
        hover={!isThisRowCollapsed}
        className={clsx(classes.dataTableRow, {
          [classes.dataTableRowCollapsed]: isThisRowCollapsed,
        })}
      >
        <TableCell align='right'>
          <IconButton onClick={handleToggleCollapse}>
            {isThisRowCollapsed ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </TableCell>

        <TableCell>{report.name}</TableCell>

        <TableCell>{moment(report.createdAt).format('L LTS')}</TableCell>

        <TableCell>
          {report.file?.createdAt ? (
            moment(report.file?.createdAt).format('L LTS')
          ) : (
            <CircularProgress size={16} color='inherit' />
          )}
        </TableCell>

        <TableCell>
          {report.file?.expiresAt
            ? moment(report.file?.expiresAt).format('L LTS')
            : t('dataTableRow.neverExpires')}
        </TableCell>

        <TableCell>
          {!report.file?.path && !report.attempts[0]?.finishedAt && !report.attempts[0]?.failedAt && (
            <Box alignItems='center'>
              <CircularProgress size={16} color='inherit' />
              &nbsp;&nbsp;
              <span>{t('dataTableRow.generating')}</span>
            </Box>
          )}

          {report.file?.path && (
            <Button
              className={classes.availableButton}
              onClick={() => handleDownloadFile(report.name, report.file.path)}
              startIcon={<GetApp />}
              variant='text'
            >
              {t('dataTableRow.available')}
            </Button>
          )}

          {report.failedAt && (
            <Button className={classes.errorButton} startIcon={<HighlightOff />} variant='text'>
              {t('dataTableRow.error')}
            </Button>
          )}
        </TableCell>

        <TableCell>
          <IconButton onClick={() => handleDeleteReport(report.id)}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>

      <ReportContent report={report} isOpen={isThisRowCollapsed} />
    </React.Fragment>
  );
};

// DataTableRow.propTypes = {
//   device: PropTypes.object.isRequired,
//   handleStopPropagation: PropTypes.func.isRequired,
//   selectedReports: PropTypes.object.isRequired,
//   setSelectedDevices: PropTypes.func.isRequired,
// };

export default DataTableRow;
