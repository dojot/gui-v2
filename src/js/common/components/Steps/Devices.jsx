import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { WFooter } from 'Components/Footer'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from './Devices'

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

  console.log(props)

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const classes = useStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center">

        <List className={classes.root}>
          {values.devices.map((value) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
              <Fragment>
                <ListItem key={value.id} role={undefined} button onClick={handleToggle(value.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value.id) !== -1}
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
            );
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
