import React from 'react';

import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { DATA_ORDER } from 'Constants';
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
  startExtraCells,
  endExtraCells,
  disableOrderBy,
  disableCheckbox,
}) => {
  const createSortHandler = property => event => {
    if (onRequestSort) onRequestSort(event, property);
  };

  return (
    <TableHead className={className}>
      <TableRow>
        {!disableCheckbox && (
          <TableCell>
            <Checkbox
              color='primary'
              onChange={onSelectAllClick}
              checked={rowCount > 0 && numSelected === rowCount}
              indeterminate={numSelected > 0 && numSelected < rowCount}
            />
          </TableCell>
        )}

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
                disabled={disableOrderBy || headCell.disableOrderBy}
                hideSortIcon={disableOrderBy || headCell.disableOrderBy}
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
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(Object.values(DATA_ORDER)),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number.isRequired,
  startExtraCells: PropTypes.node,
  endExtraCells: PropTypes.node,
  disableOrderBy: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
};

DataTableHead.defaultProps = {
  className: '',
  onRequestSort: null,
  order: DATA_ORDER.ASC,
  orderBy: '',
  startExtraCells: null,
  endExtraCells: null,
  disableOrderBy: false,
  disableCheckbox: false,
};

export default DataTableHead;
