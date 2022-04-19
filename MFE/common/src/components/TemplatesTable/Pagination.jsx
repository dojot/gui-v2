import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ROWS_PER_PAGE_OPTIONS } from '../../constants';
import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfPages,
  handleChangePage,
  numberOfSelectedTemplates,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('templatesTable');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('totalOfPages', { count: totalOfPages })}</Typography>

      {!!numberOfSelectedTemplates && (
        <Typography>
          {t('numberOfSelectedTemplates', { count: numberOfSelectedTemplates })}
        </Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        count={totalOfPages * rowsPerPage}
        labelRowsPerPage={t('labelRowsPerPage')}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        nextIconButtonText={t('nextIconButtonText')}
        backIconButtonText={t('backIconButtonText')}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
  numberOfSelectedTemplates: PropTypes.number,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  totalOfPages: 0,
  handleChangePage: null,
  numberOfSelectedTemplates: 0,
  handleChangeRowsPerPage: null,
};

export default Pagination;
