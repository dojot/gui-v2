import React, { useEffect, useReducer, useCallback } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  General,
  Devices,
  Attributes,
  InitialStateGeneral as general,
  Summary,
} from 'Components/Steps';
import { connect } from 'react-redux';
import { menuSelector } from 'Selectors/baseSelector';
import { devicesList } from 'Selectors/devicesSelector';
import { actions as deviceActions } from 'Redux/devices';
import { actions as dashboardActions } from 'Redux/dashboard';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './Wizard';

const getSteps = () => {
  return ['Geral', 'Dispositivos', 'Atributos', 'Resumo'];
};

const mapStateToProps = state => ({
  ...menuSelector(state),
  ...devicesList(state),
});

const mapDispatchToProps = {
  ...deviceActions,
  ...dashboardActions,
};

const initialState = {
  general,
  devices: [],
  attributes: [],
  activeStep: 0,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  const classes = useStyles();
  const { bar: barID } = __CONFIG__;

  useEffect(() => {
    props.getDevices();
  }, []);

  const generateBarConfig = state => {
    const { attributes, general: generalState } = state;
    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };
    const bar = attributes.map(item => ({
      dataKey: item.attributeID,
      fill: item.color,
      name: item.description || item.label,
    }));

    return { bar, meta };
  };

  const createNewWidget = attributes => {
    const widgetId = `${barID}/${uuidv4()}`;
    const newWidget = {
      i: widgetId,
      x: 0,
      y: Infinity,
      w: 6,
      h: 10,
      minW: 3,
      minH: 6,
      static: false,
      moved: false,
    };
    props.addWidget(newWidget);
    props.addWidgetConfig({ [widgetId]: generateBarConfig(attributes) });
  };

  const memoizedReducer = useCallback((state, { type, payload = {} }) => {
    switch (type) {
      case 'next':
        return {
          ...state,
          [payload.key]: payload.values,
          activeStep: state.activeStep + 1,
        };
      case 'back':
        return {
          ...state,
          activeStep: state.activeStep - 1,
        };
      case 'finish':
        createNewWidget(state);
        props.toDashboard();
        return {};
      default:
        return {};
    }
  }, []);

  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  const { isMenuOpen } = props;

  const steps = getSteps();

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  const getStepContent = stepIndex => {
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
        );
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
        );
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
        );
      case 3:
        return (
          <Summary
            initialState={{ general: state.general, values: state.attributes }}
            handleClick={dispatch}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  const { activeStep } = state;

  return (
    <div className={classes.root}>
      <Stepper
        classes={{ root: classes.paper }}
        alternativeLabel
        activeStep={activeStep}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={() => dispatch({ type: 'back' })}>Back</Button>
          </div>
        ) : (
          getStepContent(activeStep, steps)
        )}
      </div>
    </div>
  );
});
