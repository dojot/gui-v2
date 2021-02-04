// import PropTypes from 'prop-types'
import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { WFooter } from 'Components/Footer';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

const Index = props => {
  const { initialState, handleClick, ...otherProps } = props;
  const handleSubmit = values => {
    handleClick({ type: 'finish', payload: { values, key: 'general' } });
  };

  const handleBack = () => {
    handleClick({ type: 'back' });
  };

  return (
    <Formik initialValues={initialState} onSubmit={handleSubmit}>
      {formikProps => (
        <SummaryForm {...formikProps} {...otherProps} onBack={handleBack} />
      )}
    </Formik>
  );
};

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
      {values.dynamicValues.map(item => {
        const { label, deviceLabel, color, attributeID, description } = item;
        return (
          <div className={classes.colorContainer} key={attributeID}>
            <div
              className={classes.colorArea}
              style={{ backgroundColor: color }}
            />
            <div className={classes.attrItem}>
              {`${deviceLabel} - ${label} ${
                description ? ` - (${description})` : ''
              }`}
            </div>
          </div>
        );
      })}
      {values.staticValues.map(item => {
        const { label, deviceLabel, color, attributeID, description } = item;
        return (
          <div className={classes.colorContainer} key={attributeID}>
            <div
              className={classes.colorArea}
              style={{ backgroundColor: color }}
            />
            <div className={classes.attrItem}>
              {`${deviceLabel} - ${label} ${
                description ? ` - (${description})` : ''
              }`}
            </div>
          </div>
        );
      })}
      <Divider style={{ float: 'left', width: '100%' }} />
    </div>
  );
};

const SummaryForm = props => {
  const { initialValues, handleSubmit } = props;

  const classes = useStyles();
  const {
    general: { name, description },
    values,
  } = initialValues;
  const { t } = useTranslation(['dashboard']);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction='column' className={classes.root}>
        <Grid item className={classes.item}>
          <TitleBox desc={description} name={name} />
          <AttributeBox name={t('summary.attributes')} values={values} />
        </Grid>
      </Grid>
      <WFooter {...props} />
    </form>
  );
};

Index.propTypes = {};

export default Index;
