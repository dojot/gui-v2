import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { WFooter } from 'Components/Footer'
import { useStyles } from './General'

export const Init = { name: '', description: '' }

const validationSchema = Yup.object({
  name: Yup.string('Nome do Widget')
    .required('Nome é obrigatório'),
})

const General = (props) => {
  const { initialState, handleClick, ...otherProps } = props
  const handleSubmit = (values) => {
    handleClick('next', { values, key: 'general' })
  }

  const handleBack = () => {
    handleClick('back')
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

  const classes = useStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" className={classes.root}>
        <Grid item className={classes.item}>
          <TextField
            variant="outlined"
            label="Nome do widget"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.name && touched.name) && errors.name}
            margin="normal"
            error={!!errors.name}
            fullWidth
          />
        </Grid>
        <Grid item className={classes.item}>
          <TextField
            variant="outlined"
            label="Descrição"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.description && touched.description) && errors.description}
            margin="normal"
            fullWidth
          />
        </Grid>
      </Grid>
      <WFooter {...props} />
    </form>
  )
}

General.defaultProps = {
  isOpen: false,
}

General.propTypes = {
  initialState: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
}

export default General
