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

const Icn = ({ sortOrder, field, currentSortField }) => {
  if (currentSortField !== field) return null;
  if (sortOrder === -1) return <ArrowDropUpIcon fontSize='small' />;
  return <ArrowDropDownIcon fontSize='small' />;
};

const SimpleTable = ({ columns, rows, hasTimestamp, withRank }) => {
  const { head, root, lines } = useStyles();
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortField, setSortField] = useState('');

  // i really dont wanna do that... :\
  const [rws, setRws] = useState([]);

  useEffect(() => {
    console.log('useEffect:sortOrder');
    const sortedArray = rws.sort((a, b) => {
      return compareAll(a[sortField], b[sortField], sortOrder);
    });
    setRws(sortedArray);
  }, [rws, sortOrder, sortField]);

  useEffect(() => {
    console.log('useEffect:rows');
    // premanipulation to handle date sorting
    const r1 = rows.map(row => {
      return { ...row, ts: new Date(row.timestamp).getTime() };
    });
    console.log('r1', r1);
    setRws(r1);
  }, []);

  const changeSorting = index => {
    setSortField(index);
    setSortOrder(sortOrder * -1);
  };

  const ValueFormatter = ({ row, column }) => {
    if (!row[column.dataKey]) {
      return '-';
    }
    if (typeof row[column.dataKey] === 'object') {
      return (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(row[column.dataKey], undefined, 2)}
        </pre>
      );
    }
    return row[column.dataKey];
  };

  console.log('Reaload');

  return (
    <TableContainer classes={{ root }}>
      <Table stickyHeader size='small' aria-label='customized table'>
        <TableHead>
          <TableRow key='header'>
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
                    <Icn
                      currentSortField={sortField}
                      field='ts'
                      sortOrder={sortOrder}
                    />
                  }
                >
                  Timestamp
                </Button>
              </TableCell>
            ) : null}
            {columns.map(column => {
              return (
                <Tooltip title={column.dataKey.substr(0, 6)} placement='top'>
                  <TableCell
                    key={column.dataKey}
                    classes={{ head }}
                    align='center'
                  >
                    <Button
                      color='inherit'
                      size='small'
                      classes={{ root: head }}
                      onClick={() => changeSorting(column.dataKey)}
                      endIcon={
                        <Icn
                          currentSortField={sortField}
                          field={column.dataKey}
                          sortOrder={sortOrder}
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
          {rws.map((row, index) => (
            <TableRow hover key={`${row.timestamp}_${uuidv4()}`}>
              {withRank ? (
                <TableCell
                  key={`rank_${uuidv4()}`}
                  classes={{ body: lines }}
                  align='center'
                >
                  <b> {index + 1}</b>
                </TableCell>
              ) : null}

              {hasTimestamp ? (
                <TableCell
                  classes={{ body: lines }}
                  key={`timestamp_${uuidv4()}`}
                >
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
