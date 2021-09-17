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
    },
    CREATE_DASHBOARD: {
      icon: <Dashboard style={{ color: '#5B73E8' }} fontSize='large' />,
      translationKey: 'createDashboard',
      action() {
        history.push('/dashboard');
      },
    },
    CREATE_MODEL: {
      icon: <FilterNone style={{ color: '#F1B44C' }} fontSize='large' />,
      translationKey: 'createModel',
    },
    CREATE_CERTIFICATE: {
      icon: <VerifiedUser style={{ color: '#F46A6A' }} fontSize='large' />,
      translationKey: 'createCertificate',
    },
    IMPORT_EXPORT: {
      icon: <ImportExport style={{ color: '#50A5F1' }} fontSize='large' />,
      translationKey: 'importExport',
    },
    DEVICE_TEST: {
      icon: <Star style={{ color: '#F1B44C' }} fontSize='large' />,
      translationKey: 'deviceTest',
    },
  };

  return (
    <ViewContainer headerTitle={t('home:title')}>
      <Box sx={{ flexGrow: 1 }} padding={2}>
        <Grid container wrap spacing={4}>
          {Object.entries(HOME_CARDS).map(([key, card]) => {
            return (
              <Grid key={key} xs={12} sm={6} md={3} item>
                <Card className={classes.card} onClick={card.action}>
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
