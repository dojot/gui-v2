import React, { useState } from 'react';

import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { URL } from 'Constants';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

const RedirectToLogin = () => {
  const classes = useStyles();
  const { t } = useTranslation(['login', 'common']);

  const state = 'login/';
  const returnPath = '/v2/%23/dashboard';
  const [tenant, setTenant] = useState('');

  const handleSubmit = async () => {
    window.location.href = `${URL.LOGIN}?tenant=${tenant}&state=${state}&return=${returnPath}`;
  };
  return (
    <Grid container justify='center' className={classes.root}>
      <Card className={classes.grid}>
        <Typography variant='h5' color='textPrimary'>
          {t('login:welcome')}
        </Typography>
        <TextField
          id='tenant'
          name='tenant'
          inputProps={{ 'data-testid': 'test_tenant' }}
          label={t('login:tenant')}
          variant='outlined'
          size='medium'
          margin='normal'
          value={tenant}
          onChange={event => setTenant(event.target.value)}
          fullWidth
          data-testid='tenant'
        />
        <Button
          variant='outlined'
          color='secondary'
          size='medium'
          fullWidth
          className={classes.margin}
          type='submit'
          data-testid='btnLogin'
          onClick={handleSubmit}
        >
          {t('login:do_login')}
        </Button>
      </Card>
    </Grid>
  );
};

export default RedirectToLogin;
