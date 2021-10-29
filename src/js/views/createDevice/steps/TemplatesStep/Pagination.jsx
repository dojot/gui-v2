import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfTemplates,
  handleChangePage,
  numberOfSelectedTemplates,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('templatesStep.totalOfTemplates', { count: totalOfTemplates })}</Typography>

      {!!numberOfSelectedTemplates && (
        <Typography>
          {t('templatesStep.numberOfSelectedTemplates', { count: numberOfSelectedTemplates })}
        </Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        count={totalOfTemplates}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={t('templatesStep.labelRowsPerPage')}
        labelDisplayedRows={({ from, to, count }) => {
          return t('templatesStep.labelDisplayedRows', { from, to, count });
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalOfTemplates: PropTypes.number,
  handleChangePage: PropTypes.func,
  numberOfSelectedTemplates: PropTypes.number,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  totalOfTemplates: 0,
  handleChangePage: null,
  numberOfSelectedTemplates: 0,
  handleChangeRowsPerPage: null,
};

export default Pagination;
