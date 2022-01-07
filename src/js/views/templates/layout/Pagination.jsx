import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ROWS_PER_PAGE_OPTIONS } from '../../../common/constants';
import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfPages,
  numberOfSelectedTemplates,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('templates');
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
        onChangePage={handleChangePage}
        count={totalOfPages * rowsPerPage}
        labelRowsPerPage={t('labelRowsPerPage')}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        nextIconButtonText={t('nextIconButtonText')}
        backIconButtonText={t('backIconButtonText')}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={() => {
          return t('pageInfo', { page: page + 1, totalOfPages });
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalOfPages: PropTypes.number,
  numberOfSelectedTemplates: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalOfPages: 0,
};

export default Pagination;
