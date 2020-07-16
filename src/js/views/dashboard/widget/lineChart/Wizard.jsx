import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  Fragment,
} from 'react';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import {
  General,
  Devices,
  Attributes,
  InitialStateGeneral as general,
  Summary,
} from 'Components/Steps';
import _ from 'lodash';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { menuSelector } from 'Selectors/baseSelector';
import { Device as DeviceService } from 'Services';
import { v4 as uuidv4 } from 'uuid';

import ViewContainer from '../../../ViewContainer';
import useStyles from './Wizard';

const getSteps = () => {
  return ['Geral', 'Dispositivos', 'Atributos', 'Resumo'];
};

const mapStateToProps = state => ({
  ...menuSelector(state),
});

const mapDispatchToProps = {
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
  const {
    toDashboard,
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    isMenuOpen,
  } = props;
  const classes = useStyles();
  const { line: lineID } = __CONFIG__;

  const [searchDeviceTerm, setSearchDeviceTerm] = useState('');
  const [devicesData, setDevicesData] = useState({
    devices: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
  });

  useEffect(() => {
    DeviceService.getDevicesList(
      { number: devicesData.currentPage, size: devicesData.pageSize },
      { label: searchDeviceTerm },
    )
      .then(response =>
        setDevicesData(state => ({ ...state, ...response.getDevices })),
      )
      .catch(
        error => console.error(error), // TODO tratamento de erro da api
      );
  }, [devicesData.currentPage, devicesData.pageSize, searchDeviceTerm]);

  const handleSearchChange = useCallback(searchTerm => {
    setSearchDeviceTerm(searchTerm);
    setDevicesData(state => ({ ...state, currentPage: 1 }));
  }, []);

  const handlePageSizeChange = useCallback(pageSize => {
    setDevicesData(state => ({ ...state, pageSize }));
  }, []);

  const handlePageChange = useCallback((evnt, page) => {
    setDevicesData(state => ({ ...state, currentPage: page }));
  }, []);

  const generateLineConfig = state => {
    const { attributes, general: generalState } = state;
    const meta = {
      title: generalState.name || '',
      subTitle: generalState.description || '',
    };
    const line = attributes.map(item => ({
      type: 'monotone',
      dataKey: item.attributeID,
      stroke: item.color,
      name: item.description || item.label,
    }));

    return { line, meta };
  };

  const generateScheme = state => {
    return DeviceService.parseHistoryQuery({
      devices: _.values(
        _.mapValues(_.groupBy(state.attributes, 'deviceID'), (value, key) => ({
          deviceID: key,
          attrs: value.map(val => val.label),
        })),
      ),
      lastN: 15,
    });
  };

  const createLineWidget = useCallback(
    attributes => {
      const widgetId = `${lineID}/${uuidv4()}`;
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
      addWidget(newWidget);
      addWidgetConfig({ [widgetId]: generateLineConfig(attributes) });
      addWidgetSaga({ [widgetId]: generateScheme(attributes) });
    },
    [addWidget, addWidgetConfig, addWidgetSaga, lineID],
  );

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
        createLineWidget(state);
        toDashboard();
        return {};
      default:
        return {};
    }
  }, []);

  const [state, dispatch] = useReducer(memoizedReducer, initialState);
  const steps = getSteps();

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  const getStepContent = stepIndex => {
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
            initialState={devicesData.devices}
            selectedValues={state.devices}
            handleClick={dispatch}
            steps={steps}
            activeStep={stepIndex}
            isOpen={isMenuOpen}
            onFilter={handleSearchChange}
            usePagination
            currentPage={devicesData.currentPage}
            pageSize={devicesData.pageSize}
            totalPages={devicesData.totalPages}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
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
      <ViewContainer headerTitle="Grafico de Linha">
        <Fragment>
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
        </Fragment>
      </ViewContainer>
    </div>
  );
});
