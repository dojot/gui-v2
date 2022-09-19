import React from 'react';

import { Box, IconButton, Typography, TextField, InputAdornment } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';

import ActionButtons from '../../layout/ActionButtons';
import { useParameterizationStepStyles } from './style';

const ParameterizationStep = ({
  handleGoToNextStep,
  handleCancelDeviceCreation,
  handleGoToPreviousStep,
  devicesPrefix,
  setDevicesPrefix,
  devicesAmount,
  setDevicesAmount,
  initialValueSuffix,
  setInitialValueSuffix,
  handleCreateMultipleDevices,
}) => {
  const { t } = useTranslation('createMultipleDevices');
  const classes = useParameterizationStepStyles();

  const handleClearDevicesPrefix = () => {
    setDevicesPrefix('');
  };

  const handleChangeDevicesAmount = e => {
    const min = 1;
    const max = 999;
    const value = e.target.value;

    if (value < 0) {
      setDevicesAmount(min);
    } else if (value > max) {
      setDevicesAmount(max);
    } else {
      setDevicesAmount(value);
    }
  };

  const onBlurDevicesAmount = e => {
    const value = e.target.value;

    if (value < 1) setDevicesAmount(1);
  };

  const handleChangeInitialValueSuffix = e => {
    const min = 1;
    const value = e.target.value;

    if (value < 0) {
      setInitialValueSuffix(min);
    } else {
      setInitialValueSuffix(value);
    }
  };

  const onBlurInitialValueSuffix = e => {
    const value = e.target.value;

    if (value < 1) setInitialValueSuffix(1);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.stepComponent} marginBottom={4}>
          <Box marginBottom={4}>
            <Typography className={classes.stepHint}>
              <Trans t={t} i18nKey='parameterizationStep.devicesPrefixTitle' />
            </Typography>
          </Box>

          <Box marginBottom={3}>
            <TextField
              variant='outlined'
              value={devicesPrefix}
              label={t('parameterizationStep.devicesPrefixPh')}
              onChange={e => setDevicesPrefix(e.target.value)}
              InputProps={{
                endAdornment: devicesPrefix ? (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClearDevicesPrefix}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              required
              fullWidth
            />
          </Box>

          <Box marginBottom={4}>
            <Typography variant='body2'>
              <i>{t('parameterizationStep.devicesPrefixHint')}</i>
            </Typography>
          </Box>

          <Box marginBottom={4}>
            <Typography className={classes.stepHint}>
              {t('parameterizationStep.devicesAmountTitle')}
            </Typography>
          </Box>

          <Box marginBottom={4}>
            <TextField
              variant='outlined'
              type='number'
              label={t('parameterizationStep.devicesAmountPh')}
              value={devicesAmount}
              onChange={handleChangeDevicesAmount}
              onBlur={onBlurDevicesAmount}
              required
              size='medium'
            />
          </Box>

          <Box marginBottom={4}>
            <Typography className={classes.stepHint}>
              {t('parameterizationStep.initialValueSuffixTitle')}
            </Typography>
          </Box>

          <Box marginBottom={3}>
            <TextField
              variant='outlined'
              type='number'
              label={t('parameterizationStep.initialValueSuffixPh')}
              value={initialValueSuffix}
              onChange={handleChangeInitialValueSuffix}
              onBlur={onBlurInitialValueSuffix}
              required
              size='medium'
            />
          </Box>

          <Box>
            <Typography variant='body2'>
              <i>{t('parameterizationStep.initialValueSuffixHint')}</i>
            </Typography>
          </Box>
        </Box>
      </Box>

      <ActionButtons
        isNextButtonDisabled={
          devicesAmount <= 0 || devicesPrefix === '' || initialValueSuffix === ''
        }
        handleClickNextButton={handleGoToNextStep}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        withBackButton
        isLastStep
      />
    </Box>
  );
};

ParameterizationStep.propTypes = {
  selectedCertificate: PropTypes.object.isRequired,
  handleGoToNextStep: PropTypes.func.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
  devicesPrefix: PropTypes.string.isRequired,
  setDevicesPrefix: PropTypes.func.isRequired,
  devicesAmount: PropTypes.string.isRequired,
  setDevicesAmount: PropTypes.func.isRequired,
  initialValueSuffix: PropTypes.string.isRequired,
  setInitialValueSuffix: PropTypes.func.isRequired,
};

export default ParameterizationStep;
