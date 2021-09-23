import React from 'react';

import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

const DataTableHead = ({
  className,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  cells,
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={className}>
      <TableRow>
        <TableCell>
          <Checkbox
            color='primary'
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>

        <TableCell />

        {cells.map(headCell => {
          const isOrderingByThisCell = orderBy === headCell.id;

          return (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              sortDirection={isOrderingByThisCell ? order : false}
            >
              <TableSortLabel
                active={isOrderingByThisCell}
                onClick={createSortHandler(headCell.id)}
                direction={isOrderingByThisCell ? order : 'asc'}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

DataTableHead.propTypes = {
  className: PropTypes.string,
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
    }),
  ).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

DataTableHead.defaultProps = {
  className: '',
};

export default DataTableHead;
