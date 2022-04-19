import React from 'react';

import { Divider, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { object2Array } from 'sharedComponents/Utils';

import Wizard from '../../wizard';
import { useStyles } from './style';

const TitleBox = ({ name, desc }) => {
  const classes = useStyles();
  return (
    <div className={classes.containerText}>
      <div className={classes.title}>{name}</div>
      <div className={classes.description}>{desc}</div>
      <Divider />
    </div>
  );
};

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

const Summary = ({ values }) => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);

  const {
    general: { name, description },
    attributes,
  } = values;
  const attributesList = object2Array(attributes);
  return (
    <Wizard.Page>
      <Grid container direction='column' className={classes.root}>
        <Grid item className={classes.item}>
          <TitleBox desc={description} name={name} />
          <AttributeBox name={t('summary.attributes')} values={attributesList} />
        </Grid>
      </Grid>
    </Wizard.Page>
  );
};

export default Summary;
