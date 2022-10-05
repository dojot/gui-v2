import React, { useCallback, useEffect } from 'react';

import { Box, Grid, Typography, CircularProgress, TextField, Button } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { constants, actions as devicesActions } from '../../redux/modules/devices';
import {
  associatedDevicesSelector,
  devicesWithOtherCertificatesSelector,
  notAssociatedDevicesSelector,
} from '../../redux/selectors/devicesSelector';

import { useIsLoading } from 'sharedComponents/Hooks';
import { ViewContainer } from 'sharedComponents/Containers';

import useStyles from './style';

const CreateDevice = () => {
  const { t } = useTranslation(['associateCertificates', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const isLoadindAssociation = useIsLoading(constants.ASSOCIATE_DEVICES_IN_BATCH);

  const associatedDevices = useSelector(associatedDevicesSelector);
  const devicesWithOtherCertificates = useSelector(devicesWithOtherCertificatesSelector);
  const notAssociatedDevices = useSelector(notAssociatedDevicesSelector);

  useEffect(() => {
    return () => {
      dispatch(
        devicesActions.updateDevices({
          associatedDevices: [],
          devicesWithOtherCertificates: [],
          notAssociatedDevices: [],
        }),
      );
    };
  }, []);

  const handleGoToDevicesPage = () => {
    history.push('/devices');
  };

  const devicesInputParser = useCallback(
    devicesList => {
      return devicesList.map(device => `${device.label}\n`).join('');
    },
    [associatedDevices, devicesWithOtherCertificates, notAssociatedDevices],
  );

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.containerWrapper}>
        <Grid className={classes.container} alignItems='stretch' wrap='nowrap' container>
          <Grid className={classes.contentWrapper} xs item>
            <Box className={classes.content}>
              {isLoadindAssociation ? (
                <Box marginY={4} className={classes.associatingStatus}>
                  <CircularProgress size={18} color='inherit' />
                  <Typography>{t('associatingLoadingMessage')}</Typography>
                </Box>
              ) : (
                <Box marginY={4} className={classes.associatingStatus}>
                  <Done size={18} color='inherit' />
                  <Typography>{t('completeAssociationMessage')}</Typography>
                </Box>
              )}

              <Box className={classes.fieldWrapper} marginBottom={3}>
                <Typography>{t('associatedDevices')}</Typography>

                <TextField
                  className={classes.input}
                  variant='outlined'
                  disabled
                  multiline
                  rows={4}
                  fullWidth
                  value={devicesInputParser(associatedDevices)}
                />
              </Box>

              <Box className={classes.fieldWrapper} marginBottom={3}>
                <Typography>{t('devicesWithOtherCertificates')}</Typography>

                <TextField
                  className={classes.input}
                  variant='outlined'
                  disabled
                  multiline
                  rows={4}
                  fullWidth
                  value={devicesInputParser(devicesWithOtherCertificates)}
                />
              </Box>

              <Box className={classes.fieldWrapper} marginBottom={3}>
                <Typography>{t('notAssociatedDevices')}</Typography>

                <TextField
                  className={classes.input}
                  variant='outlined'
                  disabled
                  multiline
                  rows={4}
                  fullWidth
                  value={devicesInputParser(devicesWithOtherCertificates)}
                />
              </Box>
            </Box>

            {!isLoadindAssociation && (
              <Box className={classes.bottomButtonWrapper}>
                <Button
                  onClick={handleGoToDevicesPage}
                  variant='outlined'
                  color='inherit'
                  size='large'
                >
                  {t('goToDevices')}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default CreateDevice;
