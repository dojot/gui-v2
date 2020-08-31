import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { formatDate } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

import useStyles from './style';

const SimpleTable = ({ columns, rows, hasTimestamp }) => {
  const { head, root } = useStyles();

  return (
    <TableContainer classes={{ root }}>
      <Table stickyHeader size="small" aria-label="customized table">
        <TableHead>
          <TableRow key="header">
            {hasTimestamp ? (
              <TableCell key="timestamp" classes={{ head }}>
                Timestamp
              </TableCell>
            ) : null}

            {columns.map(column => {
              return (
                <Tooltip title={column.dataKey.substr(0, 6)} placement="top">
                  <TableCell
                    key={column.dataKey}
                    classes={{ head }}
                    align="center"
                  >
                    {column.name}
                  </TableCell>
                </Tooltip>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow hover key={`${row.timestamp}_${uuidv4()}`}>
              {hasTimestamp ? (
                <TableCell key={`timestamp_${uuidv4()}`}>
                  {formatDate(row.timestamp, 'DD/MM/YYYY HH:mm:ss')}
                </TableCell>
              ) : null}
              {columns.map(column => {
                return (
                  <TableCell
                    key={`${column.dataKey}_${uuidv4()}`}
                    align="center"
                  >
                    {row[column.dataKey] || '-'}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SimpleTable.defaultProps = {
  rows: [],
  hasTimestamp: false,
};

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.array,
  hasTimestamp: PropTypes.bool,
};

export default SimpleTable;
