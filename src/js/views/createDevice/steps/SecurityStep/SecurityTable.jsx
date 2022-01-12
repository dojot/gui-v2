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
  createdCertificates,
  selectedCertificate,
  handleChangePage,
  setSelectedCertificate,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useSecurityTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'fingerprint',
        label: t('securityStep.fingerprint'),
      },
      {
        id: 'creationDate',
        label: t('securityStep.creationDate'),
      },
      {
        id: 'expirationDate',
        label: t('securityStep.expirationDate'),
      },
    ],
    [t],
  );

  const handleCertificateSelection = cert => {
    const createdCertificate = createdCertificates[cert.fingerprint];
    if (createdCertificate) {
      setSelectedCertificate({
        ...cert,
        publicKey: createdCertificate.publicKeyPEM,
        privateKey: createdCertificate.privateKeyPEM,
      });
    } else {
      setSelectedCertificate(cert);
    }
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

              const handleSelectThisCertificate = () => {
                handleCertificateSelection(cert);
              };

              return (
                <TableRow
                  key={cert.fingerprint}
                  tabIndex={-1}
                  role='radio'
                  onClick={handleSelectThisCertificate}
                  hover
                >
                  <TableCell>
                    <Radio
                      color='primary'
                      checked={isSelected}
                      onChange={handleSelectThisCertificate}
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
  createdCertificates: PropTypes.object.isRequired,
  selectedCertificate: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default SecurityTable;
