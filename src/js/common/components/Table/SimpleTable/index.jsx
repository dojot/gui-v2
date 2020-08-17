import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import useStyles from './style';

const SimpleTable = ({ columns, rows }) => {
  const { head, root } = useStyles();

  return (
    <TableContainer classes={{ root }}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map(column => {
              return (
                <TableCell key={column.dataKey} classes={{ head }}>
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={`${row.timestamp}_${uuidv4()}`}>
              {columns.map(column => {
                return (
                  <TableCell key={`${column.dataKey}_${uuidv4()}`}>
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
};

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.array,
};

export default SimpleTable;
