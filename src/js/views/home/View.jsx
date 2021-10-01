import React from 'react';

import { Grid, Typography, Card, CardContent, Box, CardActionArea } from '@material-ui/core';
import {
  DevicesOther,
  Dashboard,
  FilterNone,
  VerifiedUser,
  ImportExport,
  Star,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const Home = () => {
  const { t } = useTranslation('home');
  const history = useHistory();
  const classes = useStyles();

  const HOME_CARDS = {
    CREATE_DEVICE: {
      icon: <DevicesOther style={{ color: '#34C38F' }} fontSize='large' />,
      translationKey: 'createDevice',
      route: '/create-device',
    },
    CREATE_DASHBOARD: {
      icon: <Dashboard style={{ color: '#5B73E8' }} fontSize='large' />,
      translationKey: 'createDashboard',
      route: '/dashboard',
    },
    CREATE_MODEL: {
      icon: <FilterNone style={{ color: '#F1B44C' }} fontSize='large' />,
      translationKey: 'createModel',
      route: '/create-model',
    },
    CREATE_CERTIFICATE: {
      icon: <VerifiedUser style={{ color: '#F46A6A' }} fontSize='large' />,
      translationKey: 'createCertificate',
      route: '/create-certificate',
    },
    IMPORT_EXPORT: {
      icon: <ImportExport style={{ color: '#50A5F1' }} fontSize='large' />,
      translationKey: 'importExport',
      route: '/import-export',
    },
    DEVICE_TEST: {
      icon: <Star style={{ color: '#F1B44C' }} fontSize='large' />,
      translationKey: 'deviceTest',
      route: '/device-test',
    },
  };

  return (
    <ViewContainer headerTitle={t('home:title')}>
      <Box sx={{ flexGrow: 1 }} padding={2}>
        <Grid container wrap spacing={4}>
          {Object.entries(HOME_CARDS).map(([key, card]) => {
            const handleNavigate = () => {
              if (card.route) history.push(card.route);
            };

            return (
              <Grid key={key} xs={12} sm={6} md={3} item>
                <Card className={classes.card} onClick={handleNavigate}>
                  <CardActionArea style={{ height: '100%' }}>
                    <CardContent className={classes.cardContent}>
                      {card.icon}
                      <Typography>{t(card.translationKey)}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ViewContainer>
  );
};

export default Home;
