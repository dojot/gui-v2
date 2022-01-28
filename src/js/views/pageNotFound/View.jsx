import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { ErrorOutlineRounded } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import useStyles from './style';

const PageNotFound = () => {
  const { t } = useTranslation('pageNotFound');
  const classes = useStyles();
  const history = useHistory();

  const handleGoBack = () => {
    history.push('/');
  };

  return (
    <Box className={classes.container}>
      <Box mb={1}>
        <ErrorOutlineRounded className={classes.icon} />
      </Box>

      <Box mb={1}>
        <Typography className={classes.title} variant='h4'>
          {t('title')}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant='body1'>{t('message')}</Typography>
      </Box>

      <Button variant='contained' color='primary' size='large' onClick={handleGoBack}>
        {t('backButton')}
      </Button>
    </Box>
  );
};

export default PageNotFound;
