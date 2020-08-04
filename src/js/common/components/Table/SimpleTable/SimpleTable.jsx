import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

import useStyles from './style';

const CustomizedTables = ({ columns, rows }) => {
  const { table, head, root } = useStyles();

  return (
    <TableContainer classes={{ root }}>
      <Table classes={{ table }} stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map(column => {
              return <TableCell classes={{ head }}>{column.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.label}>
              {columns.map(column => {
                return <TableCell>{row[column.dataKey] || '-'}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomizedTables.defaultProps = {
  rows: [],
};

CustomizedTables.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.array,
};

export default CustomizedTables;
