import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import PropTypes from 'prop-types';
import { formatDate, compareAll } from 'Utils';
import { v4 as uuidv4 } from 'uuid';

import useStyles from './style';

const Icn = ({ order, field, currentSortField }) => {
  if (currentSortField !== field) return null;
  if (order === -1) return <ArrowDropUpIcon fontSize='small' />;
  return <ArrowDropDownIcon fontSize='small' />;
};

const SimpleTable = ({ columns, rows, hasTimestamp, withRank }) => {
  const { head, root, lines } = useStyles();
  const [sortField, setSortField] = useState({ order: -1, field: '' });
  const [rws, setRws] = useState([]);

  useEffect(() => {
    // premanipulation to handle date sorting
    const r1 = rows.map(row => {
      return { ...row, ts: new Date(row.timestamp).getTime() };
    });
    setRws(r1);
  }, [rows]);

  const changeSorting = index => {
    const obj = { field: index, order: sortField.order * -1 };
    setSortField(obj);
  };

  const ValueFormatter = ({ row, column }) => {
    if (!row[column.dataKey]) {
      return '-';
    }
    if (typeof row[column.dataKey] === 'object') {
      return (
        <pre style={{ textAlign: 'left' }}>{JSON.stringify(row[column.dataKey], undefined, 2)}</pre>
      );
    }
    return row[column.dataKey];
  };

  const sortedArray = rws;
  sortedArray.sort((a, b) => {
    return compareAll(a[sortField.field], b[sortField.field], sortField.order);
  });

  return (
    <TableContainer classes={{ root }}>
      <Table stickyHeader size='small' aria-label='customized table'>
        <TableHead key='theader'>
          <TableRow key='headerrow'>
            {withRank ? (
              <TableCell key='rank' classes={{ head }}>
                #
              </TableCell>
            ) : null}
            {hasTimestamp ? (
              <TableCell key='timestamp' classes={{ head }}>
                <Button
                  color='inherit'
                  size='small'
                  classes={{ root: head }}
                  onClick={() => changeSorting('ts')}
                  endIcon={
                    <Icn currentSortField={sortField.field} field='ts' order={sortField.order} />
                  }
                >
                  Timestamp
                </Button>
              </TableCell>
            ) : null}
            {columns.map(column => {
              return (
                <Tooltip
                  key={`t_${column.dataKey}`}
                  title={column.dataKey.substr(0, 6)}
                  placement='top'
                >
                  <TableCell key={column.dataKey} classes={{ head }} align='center'>
                    <Button
                      color='inherit'
                      size='small'
                      classes={{ root: head }}
                      onClick={() => changeSorting(column.dataKey)}
                      endIcon={
                        <Icn
                          currentSortField={sortField.field}
                          field={column.dataKey}
                          order={sortField.order}
                        />
                      }
                    >
                      {column.name}
                    </Button>
                  </TableCell>
                </Tooltip>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedArray.map((row, index) => (
            <TableRow hover key={`${row.timestamp}_${uuidv4()}`}>
              {withRank ? (
                <TableCell key={`rank_${uuidv4()}`} classes={{ body: lines }} align='center'>
                  <b> {index + 1}</b>
                </TableCell>
              ) : null}

              {hasTimestamp ? (
                <TableCell key={`timestamp_${uuidv4()}`} classes={{ body: lines }}>
                  {formatDate(row.timestamp, 'DD/MM/YYYY HH:mm:ss')}
                </TableCell>
              ) : null}
              {columns.map(column => {
                return (
                  <TableCell
                    classes={{ body: lines }}
                    key={`${column.dataKey}_${uuidv4()}`}
                    align='center'
                  >
                    <ValueFormatter row={row} column={column} />
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
  withRank: false,
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
  withRank: PropTypes.bool,
};

export default SimpleTable;
