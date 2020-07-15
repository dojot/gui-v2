import React, { useEffect } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { actions as authenticationActions } from 'Redux/authentication';
import {
  errorSelector,
  hasTokenSelector,
} from 'Selectors/authenticationSelector';
import { isAuthenticated } from 'Utils';
import { Redirect } from 'react-router-dom';
import useStyles from './style';

const validationSchema = Yup.object({
  user: Yup.string('Digite o nome de usuário')
    .required('Usuário é Obrigatório')
    .min(5, 'Mínimo de 5 caracteres'),
  password: Yup.string('Digite a senha')
    .required('Senha é obrigatório')
    .min(5, 'Mínimo de 5 caracteres'),
});

const mapDispatchToProps = {
  ...authenticationActions,
};

const mapStateToProps = state => ({
  ...errorSelector(state),
  ...hasTokenSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ getUserToken, updateTokenStatus, hasToken, location }) => {
  useEffect(() => {
    updateTokenStatus(isAuthenticated());
  }, [hasToken]);

  const handleSubmit = ({ user, password }) => {
    getUserToken(user, password);
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
});

const LoginForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Card className={classes.grid}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography variant="h5" color="textPrimary">
            LogIn
          </Typography>
          <TextField
            id="user"
            label="Usuario"
            variant="outlined"
            size="medium"
            margin="normal"
            value={values.user}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.user && touched.user && errors.user}
            error={!!errors.user}
            fullWidth
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="medium"
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password && touched.password && errors.password}
            error={!!errors.password}
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
            Login
          </Button>
        </form>
      </Card>
    </Grid>
  );
};
