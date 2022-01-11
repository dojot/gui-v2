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
  isLoading,
  totalPages,
  rowsPerPage,
  certificates,
  handleChangePage,
  selectedCertificate,
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
    setSelectedCertificate(cert);
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
            startExtraCells={<TableCell />}
            disableCheckbox
            disableOrderBy
          />

          <TableBody>
            {certificates.map(cert => {
              const isSelected = selectedCertificate?.fingerprint === cert.fingerprint;

              return (
                <TableRow
                  key={cert.fingerprint}
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

                  <TableCell className={classes.clickableCell}>{cert.fingerprint}</TableCell>

                  <TableCell className={classes.clickableCell}>
                    {formatDate(cert.validity.notBefore, 'DD/MM/YYYY HH:mm:ss')}
                  </TableCell>

                  <TableCell className={classes.clickableCell} colSpan='2'>
                    {formatDate(cert.validity.notAfter, 'DD/MM/YYYY HH:mm:ss')}
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
            totalOfPages={totalPages}
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
  isLoading: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  certificates: PropTypes.array.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  selectedCertificate: PropTypes.object.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default SecurityTable;
