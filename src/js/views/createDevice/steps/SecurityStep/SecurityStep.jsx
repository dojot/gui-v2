import React, { useEffect, useState } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  certificateSelector,
  loadingCertificateSelector,
  paginationControlSelector,
} from 'Selectors/securitySelector';

import { actions as securityActions } from '../../../../redux/modules/security';
import ActionButtons from '../../layout/ActionButtons';
import SecurityTable from './SecurityTable';
import { useSecurityStepStyles } from './style';

const SecurityStep = ({
  selectedCertificate,
  handleGoToNextStep,
  setSelectedCertificate,
  handleCancelDeviceCreation,
  handleGoToPreviousStep,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useSecurityStepStyles();
  const dispatch = useDispatch();

  const certificates = useSelector(certificateSelector);
  const isLoading = useSelector(loadingCertificateSelector);
  const { totalPages = 0 } = useSelector(paginationControlSelector);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnClickCreation = () => {
    // TODO
  };

  useEffect(() => {
    dispatch(
      securityActions.updateCertificate({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.header} marginBottom={2}>
          <Typography>{t('securityStep.hint')}</Typography>

          <IconButton className={classes.headerButton} onClick={handleOnClickCreation}>
            <Add />
          </IconButton>
        </Box>

        <Box className={classes.stepComponent} marginBottom={2}>
          <SecurityTable
            page={page}
            certificates={certificates}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            selectedCertificate={selectedCertificate}
            isLoading={isLoading}
            handleChangePage={handleChangePage}
            setSelectedCertificate={setSelectedCertificate}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      <ActionButtons
        isNextButtonDisabled={false}
        handleClickNextButton={handleGoToNextStep}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        withBackButton
      />
    </Box>
  );
};

SecurityStep.propTypes = {
  selectedCertificate: PropTypes.object.isRequired,
  handleGoToNextStep: PropTypes.func.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default SecurityStep;
