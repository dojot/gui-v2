import React, { useEffect } from 'react';

import { Divider, Grid } from '@material-ui/core';
import { TextField, makeValidate } from 'mui-rff';
import { useTranslation, Translation } from 'react-i18next';
import * as Yup from 'yup';
import { object2Array } from 'sharedComponents/Utils';

import Wizard from '../../wizard';
import { useStyles } from './style';

const schema = Yup.object().shape({
  name: Yup.string().required('common:required').min(5, 'common:min5characters'),
});

export const summaryValidates = makeValidate(schema, error => {
  const { message } = error;
  return (
    <Translation key={`t_${message}`}>
      {t => <span className='error'>{t(`${message}`)}</span>}
    </Translation>
  );
});
const AttributeBox = ({ name, values = [] }) => {
  const classes = useStyles();
  return (
    <div className={classes.containerText}>
      <div className={classes.title}>{name}</div>
      {values.map(item => {
        const { label, deviceLabel, color, attributeID, description } = item;
        return (
          <div className={classes.colorContainer} key={attributeID}>
            <div className={classes.colorArea} style={{ backgroundColor: color }} />
            <div className={classes.attrItem}>
              {`${deviceLabel} - ${label} ${description ? ` - (${description})` : ''}`}
            </div>
          </div>
        );
      })}
      <Divider style={{ float: 'left', width: '100%' }} />
    </div>
  );
};

const Summary = ({ validate, name, values }) => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);

  const { attributes } = values;
  const attributesList = object2Array(attributes);
  return (
    <Wizard.Page validate={validate}>
      <Grid container direction='column' className={classes.root}>
        <Grid className={classes.item} item>
          <TextField
            label={t('summary.name')}
            name='name'
            variant='outlined'
            margin='none'
            fullWidth
          />
        </Grid>
        <Grid className={classes.item} item>
          <TextField
            label={t('summary.description')}
            name='description'
            variant='outlined'
            margin='none'
            fullWidth
          />
        </Grid>
        <Grid item className={classes.item}>
          <AttributeBox name={t('summary.attributes')} values={attributesList} />
        </Grid>
      </Grid>
    </Wizard.Page>
  );
};

export default Summary;
