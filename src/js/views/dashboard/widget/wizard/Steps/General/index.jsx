import React from 'react';

import Grid from '@material-ui/core/Grid';
import { TextField } from 'mui-rff';
import { useTranslation } from 'react-i18next';

import Wizard from '../../wizard';
import { useStyles } from './style';

const General = ({ validate, name }) => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);
  return (
    <Wizard.Page validate={validate}>
      <Grid container direction='column' className={classes.root}>
        <Grid item className={classes.item}>
          <TextField
            label={t('general.name')}
            name={`${name}.name`}
            variant='outlined'
            margin='normal'
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            label={t('general.description')}
            name={`${name}.description`}
            variant='outlined'
            margin='normal'
          />
        </Grid>
      </Grid>
    </Wizard.Page>
  );
};

export const generalValidates = values => {
  const errors = { general: {} };
  if (!values.general || !values.general.name) {
    errors.general.name = 'Required';
  } else if (values.general.name.length < 5) {
    errors.general.name = 'Minimo de 5 caracteres';
  }
  return errors;
};

export default General;
