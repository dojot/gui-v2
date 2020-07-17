import React, { Fragment } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

import { useStyles } from './styles';

const Paginator = props => {
  const {
    totalPages,
    currentPage,
    pageSize,
    rowsPerPage,
    onPageChange,
    onPageSizeChange,
  } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
      />
      <Select
        value={pageSize}
        onChange={e => onPageSizeChange(e.target.value)}
        className={classes.pageSizeSelector}
      >
        {rowsPerPage.map(rows => (
          <MenuItem value={rows} key={rows}>
            {`${rows} registros por página`}
          </MenuItem>
        ))}
        <MenuItem value={9999}>Todos os registros</MenuItem>
      </Select>
    </Fragment>
  );
};

Paginator.defaultProps = {
  pageSize: 9999,
  rowsPerPage: [5, 10, 20],
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default Paginator;
