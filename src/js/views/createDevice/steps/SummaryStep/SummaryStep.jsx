/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Box, IconButton, InputAdornment, Link, TextField, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ActionButtons from '../../layout/ActionButtons';
import { useSummaryStepStyles } from './style';

const download = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const SummaryStep = ({
  deviceName,
  isCreatingDevice,
  selectedTemplates,
  selectedCertificate,
  setDeviceName,
  handleCreateService,
  handleGoToPreviousStep,
  handleCancelDeviceCreation,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useSummaryStepStyles();

  const handleClearDeviceName = () => {
    setDeviceName('');
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box marginBottom={3}>
          <Typography>
            <strong>{t('summaryStep.title')}</strong>
          </Typography>

          <Typography variant='body2'>
            <i>{t('summaryStep.hint')}</i>
          </Typography>
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1.5}>
            <Typography>{t('summaryStep.deviceNameHint')}</Typography>
          </Box>

          <TextField
            className={classes.input}
            variant='outlined'
            value={deviceName}
            label={t('summaryStep.deviceNamePh')}
            onChange={e => setDeviceName(e.target.value)}
            InputProps={{
              endAdornment: deviceName ? (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClearDeviceName}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1}>
            <Typography>
              <strong>{t('summaryStep.templatesListTitle')}</strong>
            </Typography>
          </Box>

          {Object.values(selectedTemplates).map(template => {
            return <Typography key={template.id}>{template.label}</Typography>;
          })}
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1}>
            <Box component='span' marginRight={1}>
              <Typography component='span'>
                <strong>{t('summaryStep.certificateAndKeysTitle')}</strong>
              </Typography>
            </Box>

            <Box component='span'>
              <Typography variant='caption' component='i'>
                {t('summaryStep.certificateAndKeysHint')}
              </Typography>
            </Box>
          </Box>
          {selectedCertificate?.pem ? (
            <Box className={classes.certificateData}>
              <Typography>{t('summaryStep.certificate')}</Typography>

              <Link
                tabIndex={0}
                component='button'
                onClick={() => download('certificate.pem', selectedCertificate.pem)}
              >
                Link
              </Link>
            </Box>
          ) : null}
          {selectedCertificate?.privateKey ? (
            <Box className={classes.certificateData}>
              <Typography>{t('summaryStep.privateKey')}</Typography>
              <Link
                tabIndex={0}
                component='button'
                onClick={() => download('privateKey.pem', selectedCertificate.privateKey)}
              >
                Link
              </Link>
            </Box>
          ) : null}
          {selectedCertificate?.publicKey ? (
            <Box className={classes.certificateData}>
              <Typography>{t('summaryStep.publicKey')}</Typography>

              <Link
                tabIndex={0}
                component='button'
                onClick={() => download('publicKey.pem', selectedCertificate.publicKey)}
              >
                Link
              </Link>
            </Box>
          ) : null}

          {selectedCertificate?.caCertificate ? (
            <Box className={classes.certificateData}>
              <Typography>{t('summaryStep.caCertificate')}</Typography>
              <Link
                tabIndex={0}
                component='button'
                onClick={() => download('caCertificate.pem', selectedCertificate.caCertificate)}
              >
                Link
              </Link>
            </Box>
          ) : null}
        </Box>
      </Box>

      <ActionButtons
        isBackButtonDisabled={isCreatingDevice}
        isCancelButtonDisabled={isCreatingDevice}
        isNextButtonDisabled={isCreatingDevice || !deviceName.trim()}
        handleClickNextButton={handleCreateService}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        isLastStep
        withBackButton
      />
    </Box>
  );
};

SummaryStep.propTypes = {
  deviceName: PropTypes.string.isRequired,
  isCreatingDevice: PropTypes.bool.isRequired,
  selectedTemplates: PropTypes.object.isRequired,
  setDeviceName: PropTypes.func.isRequired,
  handleCreateService: PropTypes.func.isRequired,
  handleGoToPreviousStep: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default SummaryStep;
