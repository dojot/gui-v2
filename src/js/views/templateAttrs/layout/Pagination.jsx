import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfAttrs,
  numberOfSelectedAttrs,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('templateAttrs');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('totalOfAttrs', { count: totalOfAttrs })}</Typography>

      {!!numberOfSelectedAttrs && (
        <Typography>{t('numberOfSelectedAttrs', { count: numberOfSelectedAttrs })}</Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        count={totalOfAttrs}
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
  totalOfAttrs: PropTypes.number,
  numberOfSelectedAttrs: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalOfAttrs: 0,
};

export default Pagination;
