import React, { useState, useEffect, useReducer } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {
  General, Devices, Attributes, InitialStateGeneral as general, Summary,
} from 'Components/Steps'
import { connect } from 'react-redux'
import { menuSelector } from 'Selectors/baseSelector'
import { devicesList } from 'Selectors/devicesSelector'
import { actions as deviceActions } from 'Redux/devices'
import useStyles from './Wizard'

const getSteps = () => {
  return ['Geral', 'Dispositivos', 'Atributos', 'Resumo']
}

const mapStateToProps = (state) => ({
  ...menuSelector(state),
  ...devicesList(state),
})

const mapDispatchToProps = {
  ...deviceActions,
}

const initialState = {
  general,
  devices: [],
  attributes: [],
  activeStep: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
  const classes = useStyles()

  useEffect(() => {
    props.getDevices()
  }, [])

  const reducer = (state, { type, payload = {} }) => {
    switch (type) {
      case 'next':
        return {
          ...state,
          [payload.key]: payload.values,
          activeStep: state.activeStep + 1,
        }
      case 'back':
        return {
          ...state,
          activeStep: state.activeStep - 1,
        }
      default:
        return {}
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isMenuOpen } = props;
  const steps = getSteps()

  const handleReset = () => {
    dispatch({ type: 'reset' })
  }

  const getStepContent = (stepIndex) => {
    const { devices } = props;
    switch (stepIndex) {
      case 0:
        return (
          <General
            initialState={state.general}
            handleClick={dispatch}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        )
      case 1:
        return (
          <Devices
            initialState={devices}
            selectedValues={state.devices}
            handleClick={dispatch}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        )
      case 2:
        return (
          <Attributes
            initialState={state.devices}
            selectedValues={state.attributes}
            handleClick={dispatch}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        )
      case 3:
        return (
          <Summary
            initialState={{ general: state.general, values: state.attributes }}
            handleClick={dispatch}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        )
      default:
        return 'Unknown stepIndex'
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={state.activeStep} classes={{ root: classes.paper }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {state.activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={() => dispatch({ type: 'back' })}>Back</Button>
          </div>
        ) : getStepContent(state.activeStep, steps) }
      </div>
    </div>
  )
})
