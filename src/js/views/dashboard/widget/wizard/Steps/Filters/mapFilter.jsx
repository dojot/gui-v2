import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Switches } from 'mui-rff';
import { useTranslation } from 'react-i18next';

import Wizard from '../../wizard';
import { useStyles } from './style';

const MapFilters = ({ validate, name }) => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);

  return (
    <Wizard.Page validate={validate}>
      <Grid container direction='column' className={classes.root}>
        <Grid item>
          <h2>{t('filters.recover')}</h2>
          <Divider />
        </Grid>

        <Grid item className='items'>
          <Grid item className='left'>
            <div className='realTimeSwitch'>
              <h2>{t('filters.real time')}</h2>
              <Switches name={`${name}.isRealTime`} color='primary' data={{ value: false }}/>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Wizard.Page>
  );
};

export default MapFilters;
