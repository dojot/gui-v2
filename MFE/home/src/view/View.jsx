import React, { useEffect } from 'react';

import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CardActionArea,
  Tooltip,
} from '@material-ui/core';
import {
  DevicesOther,
  Dashboard,
  FilterNone,
  VerifiedUser,
  ImportExport,
  Star,
  PhoneIphone,
  DeviceHub
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { EVENT } from 'sharedComponents/Constants';
import { ViewContainer } from 'sharedComponents/Containers';
import { dispatchEvent } from 'sharedComponents/Hooks';

import { actions as deviceActions } from '../redux/modules/devices';
import { favoriteDeviceSelector } from '../redux/selectors/devicesSelector';
import useStyles from './style';

const Home = ({ isMenuOpen }) => {
  const { t } = useTranslation('home');
  const classes = useStyles();

  const favoriteDevices = useSelector(favoriteDeviceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deviceActions.getFavoriteDevices());
  }, [dispatch]);

  const HOME_CARDS = {
    CREATE_DEVICE: {
      icon: <PhoneIphone color='inherit' fontSize='large' />,
      translationKey: 'createDevice',
      route: '/devices/new',
    },
    CREATE_MULTIPLE_DEVICE: {
      icon: <DevicesOther style={{ color: '#34C38F' }} fontSize='large' />,
      translationKey: 'createMultipleDevices',
      route: '/devices/new/multiple',
    },
    CREATE_DASHBOARD: {
      icon: <Dashboard style={{ color: '#5B73E8' }} fontSize='large' />,
      translationKey: 'createDashboard',
      route: '/dashboard/widget',
    },
    CREATE_TEMPLATE: {
      icon: <FilterNone style={{ color: '#F1B44C' }} fontSize='large' />,
      translationKey: 'createTemplate',
      route: '/templates/new',
    },
    CREATE_CERTIFICATE: {
      icon: <VerifiedUser style={{ color: '#F46A6A' }} fontSize='large' />,
      translationKey: 'createCertificate',
      route: '/certificates/new',
    },
    CREATE_FLOW: {
      icon: <DeviceHub style={{ color: '#804eb8' }} fontSize='large' />,
      translationKey: 'createFlow',
      route: '/flows/new',
    },
    IMPORT_EXPORT: {
      icon: <ImportExport style={{ color: '#50A5F1' }} fontSize='large' />,
      translationKey: 'importExport',
      route: '/import-export',
      disabled: true,
    },
  };

  return (
    <ViewContainer headerTitle={t('home:title')} isMenuOpen={isMenuOpen}>
      <Box sx={{ flexGrow: 1 }} padding={2}>
        <Grid container wrap='wrap' spacing={4}>
          {Object.entries(HOME_CARDS).map(([key, card]) => {
            const isDisabled = !!card.disabled;

            const handleNavigate = () => {
              if (card.route) dispatchEvent(EVENT.CHANGE_ROUTE, { pathname: card.route });
            };

            return (
              <Grid key={key} xs={12} sm={6} md={3} item>
                <Tooltip title={t(isDisabled ? 'notAvailableAtTheMoment' : '')} placement='bottom'>
                  <Card className={`${classes.card} ${isDisabled ? classes.cardDisabled : ''}`}>
                    <CardActionArea
                      style={{ height: '100%' }}
                      disabled={isDisabled}
                      onClick={handleNavigate}
                    >
                      <CardContent className={classes.cardContent}>
                        {card.icon}
                        <Typography>{t(card.translationKey)}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Tooltip>
              </Grid>
            );
          })}

          {favoriteDevices.map(device => (
            <Grid key={device.id} xs={12} sm={6} md={3} item>
              <Card className={classes.card}>
                <CardActionArea
                  style={{ height: '100%' }}
                  onClick={() =>
                    dispatchEvent(EVENT.CHANGE_ROUTE, { pathname: `/devices/${device.id}` })
                  }
                >
                  <CardContent className={classes.cardContent}>
                    <Star style={{ color: '#F1B44C' }} />
                    <Typography>{device.label}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default Home;
