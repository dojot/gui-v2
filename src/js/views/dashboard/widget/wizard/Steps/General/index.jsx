import React from 'react';

import Grid from '@material-ui/core/Grid';
import { TextField, makeValidate } from 'mui-rff';
import { useTranslation, Translation } from 'react-i18next';
import * as Yup from 'yup';

import Wizard from '../../wizard';
import { useStyles } from './style';

const schema = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string().required('common:required').min(5, 'common:min5characters'),
  }),
});

export const generalValidates = makeValidate(schema, error => {
  const { message } = error;
  return (
    <Translation key={`t_${message}`}>
      {t => <span className='error'>{t(`${message}`)}</span>}
    </Translation>
  );
});

const General = ({ validate, name }) => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard', 'common']);

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

export default General;
