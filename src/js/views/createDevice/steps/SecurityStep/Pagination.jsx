import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfPages,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = usePaginationStyles();
  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('securityStep.totalOfPages', { count: totalOfPages })}</Typography>

      <TablePagination
        page={page}
        component='div'
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        count={totalOfPages * rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={t('securityStep.labelRowsPerPage')}
        nextIconButtonText={t('securityStep.nextIconButtonText')}
        backIconButtonText={t('securityStep.backIconButtonText')}
        labelDisplayedRows={() => {
          return t('pageInfo', { page: page + 1, totalOfPages });
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
