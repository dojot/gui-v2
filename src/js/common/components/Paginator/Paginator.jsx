import React from 'react';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useStyles } from './styles';

const Paginator = props => {
  const {
    totalPages,
    currentPage,
    pageSize,
    rowsPerPage,
    hidePrevButton,
    hideNextButton,
    showFirstButton,
    showLastButton,
    disabled,
    onPageChange,
    onPageSizeChange,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation(['paginator']);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Pagination
        variant='outlined'
        shape='rounded'
        count={totalPages}
        page={currentPage}
        hidePrevButton={hidePrevButton}
        hideNextButton={hideNextButton}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        onChange={onPageChange}
        disabled={disabled}
      />
      <Select
        value={pageSize}
        onChange={e => onPageSizeChange(e.target.value)}
        className={classes.pageSizeSelector}
      >
        {rowsPerPage.map(rows => (
          <MenuItem value={rows} key={rows}>
            {`${rows} ${t('paginator:records per page')}`}
          </MenuItem>
        ))}
        <MenuItem value={9999}>{t('paginator:all records')}</MenuItem>
      </Select>
    </Grid>
  );
};

Paginator.defaultProps = {
  pageSize: 9999,
  rowsPerPage: [5, 10, 25, 50],
  disabled: false,
  hidePrevButton: false,
  hideNextButton: false,
  showFirstButton: false,
  showLastButton: false,
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  hidePrevButton: PropTypes.bool,
  hideNextButton: PropTypes.bool,
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default Paginator;
