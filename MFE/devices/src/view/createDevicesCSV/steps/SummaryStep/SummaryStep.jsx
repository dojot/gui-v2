import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import { useSummaryStepStyles } from './style';
import DevicesErrorTable from './DevicesErrorTable';

const SummaryStep = ({
  createdDevices,
  notCreatedDevices,
  isLoadingCreateDevicesCSV,
  handleGoToDevicesPage,
}) => {
  const classes = useSummaryStepStyles();
  const { t } = useTranslation('createDevicesCSV');

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {isLoadingCreateDevicesCSV ? (
          <Box marginBottom={4} className={classes.loadingWrapper}>
            <CircularProgress color='inherit' size='16px' />
            <Typography>{t('summaryStep.createDevicesLoadingMessage')}</Typography>
          </Box>
        ) : (
          <Box marginBottom={4} className={classes.loadingWrapper}>
            <Done color='secondary' size='16px' />
            <Typography color='secondary'>{t('summaryStep.createdDevicesSuccessfully')}</Typography>
          </Box>
        )}

        <Box marginBottom={4} className={classes.devicesAmount}>
          <Typography>
            <Trans t={t} i18nKey='summaryStep.numberOfDevicesCreatedSuccessfully' />
          </Typography>
          {isLoadingCreateDevicesCSV ? (
            <CircularProgress color='inherit' size='16px' />
          ) : (
            <Typography>{createdDevices}</Typography>
          )}
        </Box>

        <Box marginBottom={4} className={classes.devicesAmount}>
          <Typography>
            <Trans t={t} i18nKey='summaryStep.numberOfDevicesWithError' />
          </Typography>
          {isLoadingCreateDevicesCSV ? (
            <CircularProgress color='inherit' size='16px' />
          ) : (
            <Typography>{notCreatedDevices.length}</Typography>
          )}
        </Box>

        <Box>
          <DevicesErrorTable notCreatedDevices={notCreatedDevices} />
        </Box>
      </Box>

      {!isLoadingCreateDevicesCSV && (
        <Box>
          <Button variant='outlined' color='inherit' size='small' onClick={handleGoToDevicesPage}>
            {t('summaryStep.goToDevices')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

SummaryStep.propTypes = {
  createdDevices: PropTypes.number.isRequired,
  notCreatedDevices: PropTypes.array.isRequired,
  isLoadingCreateDevicesCSV: PropTypes.bool.isRequired,
  handleGoToDevicesPage: PropTypes.func.isRequired,
};

export default SummaryStep;
