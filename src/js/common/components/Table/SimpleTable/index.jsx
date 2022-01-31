import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

const SortButton = ({ changeSorting, column, sortField }) => {
  const { head } = useStyles();
  const { dataKey, name } = column;
  const { field, order } = sortField;
  return (
    <Button
      color='inherit'
      size='small'
      classes={{ root: head }}
      onClick={() => changeSorting(dataKey)}
      endIcon={<Icn currentSortField={field} field={dataKey} order={order} />}
    >
      {name}
    </Button>
  );
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
    if (typeof row[column.dataKey] === 'boolean') {
      return row[column.dataKey].toString();
    }
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
            <TableCell key='rank' classes={{ head }}>
              <SortButton
                changeSorting={changeSorting}
                column={{ dataKey: 'deviceLabel', name: 'Nome' }}
                sortField={sortField}
              />
            </TableCell>
            {withRank ? (
              <TableCell key='rank' classes={{ head }}>
                #
              </TableCell>
            ) : null}
            {columns.map(column => {
              return (
                <TableCell key={column.dataKey} classes={{ head }} align='center'>
                  <SortButton changeSorting={changeSorting} column={column} sortField={sortField} />
                </TableCell>
              );
            })}
            {hasTimestamp ? (
              <TableCell key='timestamp' classes={{ head }} align='right'>
                <SortButton
                  changeSorting={changeSorting}
                  column={{ dataKey: 'ts', name: 'Atualizado às' }}
                  sortField={sortField}
                />
              </TableCell>
            ) : null}
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
              <TableCell key={`rank_${uuidv4()}`} classes={{ body: lines }} align='left'>
                {row.deviceLabel}
              </TableCell>
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
              {hasTimestamp ? (
                <TableCell key={`timestamp_${uuidv4()}`} classes={{ body: lines }} align='right'>
                  {formatDate(row.timestamp, 'L LTS')}
                </TableCell>
              ) : null}
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
