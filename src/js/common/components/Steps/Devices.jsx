import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { WFooter } from 'Components/Footer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { useStyles } from './Devices'

const validationSchema = Yup.object({
})

const Devices = (props) => {
  const { initialState, handleClick, ...otherProps } = props

  const handleSubmit = (values) => {
    handleClick({ type: 'next', payload: { values: values.devices, key: 'devices' } })
  }

  const handleBack = () => {
    handleClick({ type: 'back' })
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
    initialValues,
    handleChange,
    handleSubmit,
    selectedValues,
  } = props

  const [checked, setChecked] = React.useState(selectedValues)

  const handleToggle = (value) => {
    const currentIndex = checked.map((item) => item.id).indexOf(value.id)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    handleChange({ currentTarget: { name: 'devices', value: newChecked } })
  }

  const getItemSelected = (id) => checked.map((item) => item.id).indexOf(id) !== -1

  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center">
        <List className={classes.root}>
          {initialValues.devices.map((value) => {
            const labelId = `checkbox-list-label-${value.id}`

            return (
              <Fragment key={value.id}>
                <ListItem
                  role={undefined}
                  button
                  onClick={() => handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={getItemSelected(value.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`[${value.id}] ${value.label}`} />
                </ListItem>
                <Divider />
              </Fragment>
            )
          })}
        </List>

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
