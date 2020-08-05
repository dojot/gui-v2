import React from 'react';

import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { Authentication } from 'Services';
import { isAuthenticated } from 'Utils';
import * as Yup from 'yup';

import useStyles from './style';

const validationSchema = Yup.object({
  user: Yup.string('Digite o nome de usuário')
    .required('Usuário é Obrigatório')
    .min(5, 'Mínimo de 5 caracteres'),
  password: Yup.string('Digite a senha')
    .required('Senha é obrigatório')
    .min(5, 'Mínimo de 5 caracteres'),
});

const LoginView = ({ location, history }) => {
  const handleSubmit = async ({ user, password }) => {
    try {
      await Authentication.login({
        user,
        password,
      });
      history.push('/dashboard');
    } catch (e) {
      // TODO: Handle the exception more appropriately
      console.error(e.message);
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
      {formikProps => <LoginForm {...formikProps} />}
    </Formik>
  );
};

const LoginForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['login', 'common']);
  return (
    <Grid container justify="center" className={classes.root}>
      <Card className={classes.grid}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography variant="h5" color="textPrimary">
            {t('login:login')}
          </Typography>
          <TextField
            id="user"
            label={t('login:user')}
            variant="outlined"
            size="medium"
            margin="normal"
            value={values.user}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.user && touched.user && errors.user}
            error={errors.user && touched.user}
            fullWidth
          />
          <TextField
            id="password"
            label={t('login:password')}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="medium"
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password && touched.password && errors.password}
            error={errors.password && touched.password}
            margin="normal"
          />
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            fullWidth
            className={classes.margin}
            type="submit"
          >
            {t('common:cancel')}
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default LoginView;
