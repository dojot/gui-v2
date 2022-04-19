import React, { useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  CircularProgress,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { DataTableHead } from 'sharedComponents/DataTable';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Pagination from './Pagination';
import SecurityTableRow from './SecurityTableRow';
import { useSecurityTableStyles } from './style';

const SecurityTable = ({
  page,
  isLoading,
  totalPages,
  rowsPerPage,
  certificates,
  createdCertificate,
  certificateDetails,
  selectedCertificate,
  isDeletingCreatedCertificate,
  handleChangePage,
  setSelectedCertificate,
  handleChangeRowsPerPage,
  handleDeleteCreatedCertificate,
}) => {
  const { t } = useTranslation(['createDevice', 'common']);
  const classes = useSecurityTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'fingerprint',
        label: t('securityStep.fingerprint'),
      },
      {
        id: 'subjectDN',
        label: t('securityStep.subjectDN'),
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
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            className={classes.tableHead}
            cells={headCells}
            rowCount={certificates.length}
            startExtraCells={<TableCell />}
            endExtraCells={<TableCell />}
            disableCheckbox
            disableOrderBy
          />

          {createdCertificate && certificateDetails ? (
            <TableBody>
              <SecurityTableRow
                isNew
                isSelected
                subjectDN={certificateDetails.subjectDN}
                fingerprint={certificateDetails.fingerprint}
                creationDate={certificateDetails.validity.notBefore}
                expirationDate={certificateDetails.validity.notAfter}
              />
            </TableBody>
          ) : (
            <TableBody>
              {certificates.map(cert => {
                const isSelected = selectedCertificate?.fingerprint === cert.fingerprint;

                const handleSelectThisCertificate = () => {
                  if (isSelected) setSelectedCertificate({});
                  else setSelectedCertificate(cert);
                };

                return (
                  <SecurityTableRow
                    key={cert.fingerprint}
                    isSelected={isSelected}
                    subjectDN={cert.subjectDN}
                    fingerprint={cert.fingerprint}
                    creationDate={cert.validity.notBefore}
                    expirationDate={cert.validity.notAfter}
                    handleSelectCertificate={handleSelectThisCertificate}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>

        {!!certificates.length && !createdCertificate && (
          <Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            totalOfPages={totalPages}
            hasSelectedCertificate={!!selectedCertificate?.fingerprint}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      {!!createdCertificate && (
        <Box py={2}>
          <Button
            variant='outlined'
            disabled={isDeletingCreatedCertificate}
            onClick={handleDeleteCreatedCertificate}
            endIcon={isDeletingCreatedCertificate ? <CircularProgress size={14} /> : <Delete />}
          >
            {t('securityStep.deleteCreatedCertificate')}
          </Button>
        </Box>
      )}

      {certificates.length === 0 && !createdCertificate && (
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
  createdCertificate: PropTypes.object,
  certificateDetails: PropTypes.object,
  selectedCertificate: PropTypes.object.isRequired,
  isDeletingCreatedCertificate: PropTypes.bool.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleDeleteCreatedCertificate: PropTypes.func.isRequired,
};

SecurityTable.defaultProps = {
  createdCertificate: null,
  certificateDetails: null,
};

export default SecurityTable;
