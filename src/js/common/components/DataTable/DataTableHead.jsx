import React from 'react';

import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

import { DATA_ORDER } from '../../constants';

const DataTableHead = ({
  className,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  cells,
  startExtraCells,
  endExtraCells,
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

        {startExtraCells}

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
                disabled={headCell.disableOrderBy}
                hideSortIcon={headCell.disableOrderBy}
                onClick={createSortHandler(headCell.id)}
                direction={isOrderingByThisCell ? order : DATA_ORDER.ASC}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}

        {endExtraCells}
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
      disableOrderBy: PropTypes.bool,
    }),
  ).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(Object.values(DATA_ORDER)).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  startExtraCells: PropTypes.node,
  endExtraCells: PropTypes.node,
};

DataTableHead.defaultProps = {
  className: '',
  startExtraCells: null,
  endExtraCells: null,
};

export default DataTableHead;
