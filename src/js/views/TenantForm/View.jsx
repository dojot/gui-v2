import React, { useState } from 'react';

import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useTranslation } from 'react-i18next';
import { redirectToLogin } from 'Utils';

import useStyles from './styles';

const TenantForm = () => {
  const classes = useStyles();
  const { t } = useTranslation('tenantForm');

  const [tenant, setTenant] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (tenant.trim() === '') return;
    redirectToLogin(tenant, '/v2/#/home');
  };

  return (
    <Grid container justify='center' className={classes.root}>
      <Card className={classes.grid} component='form' noValidate onSubmit={handleSubmit}>
        <Typography variant='h5' color='textPrimary'>
          {t('title')}
        </Typography>

        <TextField
          id='tenant'
          name='tenant'
          size='medium'
          value={tenant}
          margin='normal'
          variant='outlined'
          data-testid='tenant'
          label={t('tenantLabel')}
          inputProps={{ 'data-testid': 'test_tenant' }}
          onChange={event => setTenant(event.target.value)}
          fullWidth
        />

        <Button
          className={classes.margin}
          size='medium'
          type='submit'
          color='primary'
          variant='outlined'
          data-testid='btnLogin'
          fullWidth
        >
          {t('loginButton')}
        </Button>
      </Card>
    </Grid>
  );
};

export default TenantForm;
