import React, { useMemo } from 'react';

import {
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  Typography,
  Box,
} from '@material-ui/core';
import { DataTableHead } from 'Components/DataTable';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'Utils';

import Pagination from './Pagination';
import { useSecurityTableStyles } from './style';

const SecurityTable = ({
  page,
  certificates,
  totalPages,
  rowsPerPage,
  selectedCertificate,
  isLoading,
  handleChangePage,
  setSelectedCertificate,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useSecurityTableStyles();
  const headCells = useMemo(
    () => [
      {
        id: 'certificate',
        label: t('securityStep.certificateName'),
      },
      {
        id: 'creationTime',
        label: t('securityStep.creationTime'),
      },
      {
        id: 'expirationTime',
        label: t('securityStep.expirationTime'),
      },
    ],
    [t],
  );

  const handleCertificateSelection = cert => {
    setSelectedCertificate(cert.id);
  };

  if (isLoading) {
    return (
      <Box className={classes.loadingContainer} padding={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <>
      <TableContainer>
        <Table aria-labelledby='tableTitle'>
          <DataTableHead
            className={classes.tableHead}
            cells={headCells}
            rowCount={certificates.length}
            disableCheckbox
            disableOrderBy
            startExtraCells={<TableCell />}
          />

          <TableBody>
            {certificates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(cert => {
              const isSelected = selectedCertificate === cert.id;

              return (
                <TableRow
                  key={cert.id}
                  tabIndex={-1}
                  role='radio'
                  onClick={() => handleCertificateSelection(cert)}
                  hover
                >
                  <TableCell>
                    <Radio
                      color='primary'
                      checked={isSelected}
                      onChange={() => handleCertificateSelection(cert)}
                    />
                  </TableCell>

                  <TableCell className={classes.clickableCell}>{cert.id}</TableCell>
                  <TableCell className={classes.clickableCell}>
                    {formatDate(cert.creation, 'DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell className={classes.clickableCell} colSpan='2'>
                    {formatDate(cert.expiration, 'DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {!!certificates.length && (
          <Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            total={totalPages}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      {certificates.length === 0 && (
        <Box className={classes.emptyList}>
          <Typography className={classes.emptyListText}>
            {t('securityStep.emptyCertificateList')}
          </Typography>
        </Box>
      )}
    </>
  );
};

SecurityTable.propTypes = {
  page: PropTypes.number.isRequired,
  certificates: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectedCertificate: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default SecurityTable;
