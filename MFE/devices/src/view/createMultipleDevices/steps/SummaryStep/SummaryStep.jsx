import React, { useEffect } from 'react';

import { Box, Typography, CircularProgress, Button } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { useSummaryStepStyles } from './style';

const SummaryStep = ({
  isCreatingDevices,
  selectedTemplates,
  handleCreateMultipleDevices,
  devicesPrefix,
  devicesAmount,
  initialValueSuffix,
  handleGoToDevices,
  createdDevicesWithError,
}) => {
  const { t } = useTranslation(['createMultipleDevices', 'common']);
  const classes = useSummaryStepStyles();

  useEffect(() => {
    handleCreateMultipleDevices();
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {isCreatingDevices ? (
          <Box marginBottom={6} className={classes.creationDevicesStatus}>
            <CircularProgress size={18} color='inherit' />
            <Typography>{t('summaryStep.createDevicesLoadingMessage')}</Typography>
          </Box>
        ) : (
          <Box marginBottom={6} className={classes.finishedCreationDevicesStatus}>
            <Box className={classes.creationDevicesStatus}>
              <Done size={18} color='secondary' />
              <Typography color='secondary'>
                {t('summaryStep.devicesCreatedSuccessfully')}
              </Typography>
            </Box>

            {createdDevicesWithError && (
              <Box marginTop={2}>
                <Typography>
                  <i>{t('summaryStep.devicesNotCreatedMsg')}</i>
                </Typography>
              </Box>
            )}
          </Box>
        )}

        <Box marginBottom={3}>
          <Typography>
            <strong>{t('summaryStep.title')}</strong>
          </Typography>
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
            <Typography>
              <strong>{t('summaryStep.devicesPrefixTitle')}</strong>
            </Typography>
          </Box>

          <Typography>{devicesPrefix}</Typography>
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1}>
            <Typography>
              <strong>{t('summaryStep.devicesAmountTitle')}</strong>
            </Typography>
          </Box>

          <Typography>{devicesAmount}</Typography>
        </Box>

        <Box marginBottom={3}>
          <Box marginBottom={1}>
            <Typography>
              <strong>{t('summaryStep.initialValueSuffixTitle')}</strong>
            </Typography>
          </Box>

          <Typography>{initialValueSuffix}</Typography>
        </Box>
      </Box>

      <Box>
        <Button onClick={handleGoToDevices} variant='outlined' color='inherit' size='large'>
          {t('summaryStep.goToDevicesList')}
        </Button>
      </Box>
    </Box>
  );
};

SummaryStep.propTypes = {
  isCreatingDevices: PropTypes.bool.isRequired,
  handleCreateMultipleDevices: PropTypes.func.isRequired,
  devicesPrefix: PropTypes.string.isRequired,
  devicesAmount: PropTypes.string.isRequired,
  initialValueSuffix: PropTypes.string.isRequired,
  handleGoToDevices: PropTypes.func.isRequired,
  createdDevicesWithError: PropTypes.bool.isRequired,
};

export default SummaryStep;
