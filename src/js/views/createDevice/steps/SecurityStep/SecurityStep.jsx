import React, { useEffect, useState, useMemo } from 'react';

import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Add, Check } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from '../../../../common/hooks';
import { constants, actions as certificatesActions } from '../../../../redux/modules/certificates';
import {
  certificatesSelector,
  paginationControlSelector,
  certificateDataSelector,
  certificateDetailsSelector,
} from '../../../../redux/selectors/certificatesSelector';
import ActionButtons from '../../layout/ActionButtons';
import SecuritySearchBar from './SecuritySearchBar';
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

  const certificates = useSelector(certificatesSelector);
  const createdCertificate = useSelector(certificateDataSelector);
  const { totalPages = 0 } = useSelector(paginationControlSelector);
  const certificateDetails = useSelector(certificateDetailsSelector);

  const isLoadingCertificates = useIsLoading(constants.GET_CERTIFICATES);
  const isDeletingCreatedCertificate = useIsLoading(constants.DELETE_CERTIFICATE);

  // The GET_CERTIFICATES_BY_FINGERPRINT action will be dispatched after creating a certificate
  const isCreatingCertificate = useIsLoading(
    constants.CREATE_CERTIFICATE_ONE_CLICK,
    constants.GET_CERTIFICATES_BY_FINGERPRINT,
  );

  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const canCreateCertificate = useMemo(() => {
    return !createdCertificate;
  }, [createdCertificate]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnClickCreation = () => {
    dispatch(
      certificatesActions.createCertificateOneClick({
        shouldGetCurrentPageAgain: true,
        successCallback(certificateData) {
          setSearchText('');
          setSelectedCertificate({
            caCertificate: undefined,
            pem: certificateData.certificatePem,
            publicKey: certificateData.publicKeyPEM,
            privateKey: certificateData.privateKeyPEM,
            fingerprint: certificateData.certificateFingerprint,
          });
        },
      }),
    );
  };

  const handleDeleteCreatedCertificate = () => {
    if (createdCertificate) {
      const runAfterDeleteCertificate = () => {
        setSelectedCertificate({});

        dispatch(
          certificatesActions.getNewGeneratedCertificate({
            certificateData: null,
          }),
        );

        dispatch(
          certificatesActions.setCertificateDetails({
            certificateDetails: null,
          }),
        );
      };

      dispatch(
        certificatesActions.deleteCertificate({
          fingerprint: createdCertificate.certificateFingerprint,
          successCallback: runAfterDeleteCertificate,
        }),
      );
    }
  };

  const handleSearchCertificates = search => {
    setSearchText(search);
  };

  useEffect(() => {
    dispatch(
      certificatesActions.getCertificateById({
        id: 'null',
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        filter: {
          fingerprint: searchText,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage, searchText]);

  useEffect(() => {
    if (createdCertificate) {
      dispatch(
        certificatesActions.getCertificateByFingerprint({
          fingerprint: createdCertificate.certificateFingerprint,
        }),
      );
    }
  }, [createdCertificate, dispatch]);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.header} marginBottom={2}>
          <Typography>{t('securityStep.hint')}</Typography>

          <Tooltip
            placement='left'
            classes={{ tooltip: classes.tooltip }}
            title={t(
              canCreateCertificate
                ? 'securityStep.createCertificateWithOneClick'
                : 'securityStep.cannotCreateMoreCertificates',
            )}
            arrow
          >
            <div>
              <IconButton
                className={
                  canCreateCertificate ? classes.headerButton : classes.headerButtonSuccess
                }
                onClick={canCreateCertificate ? handleOnClickCreation : null}
                disabled={isCreatingCertificate}
              >
                {(() => {
                  if (isCreatingCertificate) return <CircularProgress size={14} color='inherit' />;
                  if (canCreateCertificate) return <Add />;
                  return <Check />;
                })()}
              </IconButton>
            </div>
          </Tooltip>
        </Box>

        {canCreateCertificate && (
          <Box mb={2}>
            <SecuritySearchBar
              lastSearchedText={searchText}
              handleSearch={handleSearchCertificates}
            />
          </Box>
        )}

        <Box className={classes.stepComponent} marginBottom={2}>
          <SecurityTable
            page={page}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            certificates={certificates}
            certificateDetails={certificateDetails}
            createdCertificate={createdCertificate}
            selectedCertificate={selectedCertificate}
            isDeletingCreatedCertificate={isDeletingCreatedCertificate}
            isLoading={isLoadingCertificates}
            handleChangePage={handleChangePage}
            setSelectedCertificate={setSelectedCertificate}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleDeleteCreatedCertificate={handleDeleteCreatedCertificate}
          />
        </Box>
      </Box>

      <ActionButtons
        isNextButtonDisabled={isCreatingCertificate || isDeletingCreatedCertificate}
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
