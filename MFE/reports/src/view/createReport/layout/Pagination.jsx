import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ROWS_PER_PAGE_OPTIONS } from 'sharedComponents/Constants';
import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfPages,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('createReport');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('pagination.totalOfPages', { count: totalOfPages })}</Typography>

      <TablePagination
        page={page}
        component='div'
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        count={totalOfPages * rowsPerPage}
        labelRowsPerPage={t('pagination.labelRowsPerPage')}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        nextIconButtonText={t('pagination.nextIconButtonText')}
        backIconButtonText={t('pagination.backIconButtonText')}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={() => {
          return t('pagination.pageInfo', { page: page + 1, totalOfPages });
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalOfPages: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  totalOfPages: 0,
  handleChangePage: null,
  handleChangeRowsPerPage: null,
};

export default Pagination;
