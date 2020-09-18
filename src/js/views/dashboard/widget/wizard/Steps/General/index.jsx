import React from 'react';

import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { WFooter } from 'Components/Footer';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useStyles } from './style';

export const Init = { name: '', description: '' };

const validationSchema = Yup.object({
  name: Yup.string('general.enterName').required('general.nameRequired'),
});

const Index = props => {
  const { initialState, handleClick, ...otherProps } = props;
  const handleSubmit = values => {
    handleClick({ type: 'next', payload: { values, key: 'general' } });
  };

  const handleBack = () => {
    handleClick({ type: 'back' });
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <GeneralForm {...formikProps} {...otherProps} onBack={handleBack} />
      )}
    </Formik>
  );
};

const GeneralForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction='column' className={classes.root}>
        <Grid item className={classes.item}>
          <TextField
            variant='outlined'
            label={t('general.name')}
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.name && touched.name && t(errors.name)}
            margin='normal'
            error={!!errors.name}
            fullWidth
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            variant='outlined'
            label={t('general.description')}
            name='description'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.description && touched.description && errors.description
            }
            margin='normal'
            fullWidth
          />
        </Grid>
      </Grid>
      <WFooter {...props} />
    </form>
  );
};

Index.defaultProps = {
  isOpen: false,
};

Index.propTypes = {
  initialState: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
};

export default Index;
