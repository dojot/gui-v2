import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfTemplates,
  numberOfSelectedTemplates,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('templates');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('totalOfTemplates', { count: totalOfTemplates })}</Typography>

      {!!numberOfSelectedTemplates && (
        <Typography>
          {t('numberOfSelectedTemplates', { count: numberOfSelectedTemplates })}
        </Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        count={totalOfTemplates}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={t('labelRowsPerPage')}
        labelDisplayedRows={({ from, to, count }) => {
          return t('labelDisplayedRows', { from, to, count });
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalOfTemplates: PropTypes.number.isRequired,
  numberOfSelectedTemplates: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default Pagination;
