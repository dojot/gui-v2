import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfCertificationAuthorities,
  handleChangePage,
  numberOfSelectedCertificationAuthorities,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('certificationAuthorities');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('totalOfItems', { count: totalOfCertificationAuthorities })}</Typography>

      {!!numberOfSelectedCertificationAuthorities && (
        <Typography>
          {t('numberOfSelectedItems', { count: numberOfSelectedCertificationAuthorities })}
        </Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        count={totalOfCertificationAuthorities}
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
  totalOfCertificationAuthorities: PropTypes.number,
  handleChangePage: PropTypes.func,
  numberOfSelectedCertificationAuthorities: PropTypes.number,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  totalOfCertificationAuthorities: 0,
  handleChangePage: null,
  numberOfSelectedCertificationAuthorities: 0,
  handleChangeRowsPerPage: null,
};

export default Pagination;
