import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({ page, rowsPerPage, total, handleChangePage, handleChangeRowsPerPage }) => {
  const { t } = useTranslation('createDevice');
  const classes = usePaginationStyles();
  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('securityStep.totalPages', { count: total })}</Typography>

      <TablePagination
        page={page}
        component='div'
        count={total}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={t('securityStep.labelRowsPerPage')}
        labelDisplayedRows={({ from, to, count }) => {
          return t('securityStep.labelDisplayedRows', { from, to, count });
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  total: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  total: 0,
  handleChangePage: null,
  handleChangeRowsPerPage: null,
};

export default Pagination;
