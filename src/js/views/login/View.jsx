import React, { useState } from 'react';

import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { Authentication } from 'Services';
import { isAuthenticated } from 'Utils';
import * as Yup from 'yup';

import useStyles from './style';

const validationSchema = Yup.object({
  user: Yup.string('login:enter a username')
    .required('login:User is required')
    .min(5, 'login:5 characters minimum'),
  password: Yup.string('login:Type the password')
    .required('login:Password is required')
    .min(5, 'login:5 characters minimum'),
});

const LoginView = ({ location, history }) => {
  const [hasError, setHasError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const handleSubmit = async ({ user, password }) => {
    try {
      await Authentication.login({
        user,
        password,
      });
      history.push('/dashboard');
    } catch ({ message }) {
      // TODO: Handle the exception more appropriately
      console.error(message);
      setHasError(true);
      setMsgError(
        message.indexOf('404') !== -1 ? 'networkError' : 'loginError',
      );
    }
  };
  const initialState = {
    user: '',
    password: '',
  };

  if (isAuthenticated()) {
    return (
      <Redirect to={{ pathname: '/dashboard', state: { from: location } }} />
    );
  }

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <LoginForm {...formikProps} hasError={hasError} msgError={msgError} />
      )}
    </Formik>
  );
};

export const LoginForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  hasError,
  msgError,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['login', 'common']);

  return (
    <Grid container justify='center' className={classes.root}>
      <Card className={classes.grid}>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <Typography variant='h5' color='textPrimary'>
            {t('login:login')}
          </Typography>
          <TextField
            id='user'
            name='user'
            inputProps={{ 'data-testid': 'userTest' }}
            label={t('login:user')}
            variant='outlined'
            size='medium'
            margin='normal'
            value={values.user}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.user && touched.user && t(errors.user)}
            error={errors.user && touched.user}
            fullWidth
            data-testid='user'
          />
          <TextField
            id='password'
            name='password'
            inputProps={{ 'data-testid': 'passwordTest' }}
            label={t('login:password')}
            type='password'
            autoComplete='current-password'
            variant='outlined'
            size='medium'
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.password && touched.password && t(errors.password)
            }
            error={errors.password && touched.password}
            margin='normal'
            data-testid='password'
          />
          {hasError && (
            <Alert severity='error' size='medium' margin='normal'>
              {t(`login:${msgError}`)}
            </Alert>
          )}
          <Button
            variant='outlined'
            color='secondary'
            size='medium'
            fullWidth
            className={classes.margin}
            type='submit'
            data-testid='btnLogin'
          >
            {t('login:login')}
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default LoginView;
