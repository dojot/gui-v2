import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfCertificates,
  handleChangePage,
  numberOfSelectedCertificates,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('certificates');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('totalOfCertificates', { count: totalOfCertificates })}</Typography>

      {!!numberOfSelectedCertificates && (
        <Typography>
          {t('numberOfSelectedCertificates', { count: numberOfSelectedCertificates })}
        </Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        count={totalOfCertificates}
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
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalOfCertificates: PropTypes.number,
  handleChangePage: PropTypes.func,
  numberOfSelectedCertificates: PropTypes.number,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  totalOfCertificates: 0,
  handleChangePage: null,
  numberOfSelectedCertificates: 0,
  handleChangeRowsPerPage: null,
};

export default Pagination;
