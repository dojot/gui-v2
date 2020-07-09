import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, TextField, Button, Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { login } from 'Utils'

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: 50,
    padding: 16,
    height: 'fit-content',
  },

  margin: {
    marginTop: 16,
    marginBottom: 8,
  },

  root: {
    flex: 1,
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.login,
  },
}));

const validationSchema = Yup.object({
  user: Yup.string('Digite o nome de usuário')
    .required('Usuário é Obrigatório')
    .min(5, 'Mínimo de 5 caracteres'),
  password: Yup.string('Digite a senha')
    .required('Senha é obrigatório')
    .min(5, 'Mínimo de 5 caracteres'),
})

export default ({ history }) => {
  const handleSubmit = (values) => {
    console.log(values)
    login('abc123')
    history.push('/dashboard')
  }
  const initialState = {
    user: '',
    password: '',
  }

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => <LoginForm {...formikProps} />}
    </Formik>
  )
}

export const LoginForm = ({
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
            helperText={(errors.user && touched.user) && errors.user}
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
            helperText={(errors.password && touched.password) && errors.password}
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
}
