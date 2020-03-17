import React, { useState, useEffect } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { General, Devices, InitialStateGeneral as general } from 'Components/Steps'
import { connect } from 'react-redux'
import { menuSelector } from 'Selectors/baseSelector'
import { devicesList } from 'Selectors/devicesSelector'
import { actions as deviceActions } from 'Redux/devices'
import useStyles from './Wizard'

const getSteps = () => {
  return ['Geral', 'Dispositivos']
}

const mapStateToProps = (state) => ({
  ...menuSelector(state),
  ...devicesList(state),
})

const mapDispatchToProps = {
  ...deviceActions,
}

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [stepState, setStepState] = useState({
    general,
    devices: [],
  })

  useEffect(() => {
    props.getDevices()
  }, [])

  useEffect(() => {
    const { devices } = props;
    setStepState((prevStepState) => ({ ...prevStepState, devices }))
  }, [props.devices])

  const { isMenuOpen } = props;
  const steps = getSteps()

  const handleReset = () => {
    setActiveStep(0)
  }

  const handlePageChange = (operation, item) => {
    if (operation === 'next') {
      const { key, values } = item
      setStepState((prevStepState) => ({ ...prevStepState, [key]: values }))
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else if (operation === 'back') {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <General
            initialState={stepState.general}
            handleClick={handlePageChange}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        )
      case 1:
        return (
          <Devices
            initialState={stepState.devices}
            handleClick={handlePageChange}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        )
      case 2:
        return 'This is the bit I really care about!'
      case 3:
        return 'This is a secret bonus stage!'
      default:
        return 'Unknown stepIndex'
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} classes={{ root: classes.paper }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : getStepContent(activeStep, steps) }
      </div>
    </div>
  )
})
