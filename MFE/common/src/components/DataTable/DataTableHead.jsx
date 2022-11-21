import React from 'react';

import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
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
              color='secondary'
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
              className={headCell.className}
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
                {headCell.withHelpIcon && headCell.helpText && (
                  <Tooltip arrow placement='top' title={headCell.helpText}>
                    <HelpOutline fontSize='small' style={{ marginRight: '4px' }} />
                  </Tooltip>
                )}
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
      className: PropTypes.string,
      label: PropTypes.string,
      align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
      disableOrderBy: PropTypes.bool,
    }),
  ).isRequired,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(Object.values(DATA_ORDER)),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  startExtraCells: PropTypes.node,
  endExtraCells: PropTypes.node,
  disableOrderBy: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
};

DataTableHead.defaultProps = {
  className: '',
  numSelected: 0,
  onRequestSort: null,
  onSelectAllClick: null,
  order: DATA_ORDER.ASC,
  orderBy: '',
  rowCount: 0,
  startExtraCells: null,
  endExtraCells: null,
  disableOrderBy: false,
  disableCheckbox: false,
};

export default DataTableHead;
