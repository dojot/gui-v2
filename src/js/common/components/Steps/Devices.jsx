import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { WFooter } from 'Components/Footer'

const validationSchema = Yup.object({
  name: Yup.string('Nome do Widget')
    .required('Nome é obrigatório'),
})

const Devices = (props) => {
  const { initialState, handleClick, ...otherProps } = props
  const handleSubmit = (values) => {
    handleClick('next', { values, key: 'devices' });
  }

  const handleBack = () => {
    handleClick('back');
  }

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => <GeneralForm {...formikProps} {...otherProps} onBack={handleBack} />}
    </Formik>
  )
}

const GeneralForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <TextField
            variant="outlined"
            label="Nome"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.name && touched.name) && errors.name}
            margin="normal"
            error={!!errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Descrição"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.description && touched.description) && errors.description}
            margin="normal"
          />
        </Grid>
      </Grid>
      <WFooter {...props} />
    </form>
  )
}

Devices.defaultProps = {}

Devices.propTypes = {
  initialState: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
}

export default Devices
