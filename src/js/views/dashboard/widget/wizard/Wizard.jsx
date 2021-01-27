import React, { useCallback, useEffect, useReducer, useState } from 'react';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { usePaginator } from 'Components/Paginator';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import { menuSelector } from 'Selectors/baseSelector';
import { Device as DeviceService } from 'Services';

import { ViewContainer } from '../../../stateComponents';
import useArea from './hooks/useArea';
import useBar from './hooks/useBar';
import useLine from './hooks/useLine';
import useTable from './hooks/useTable';
import {
  Attributes,
  Devices,
  GeneralFilter,
  General,
  InitialStateGeneral as general,
  Summary,
} from './Steps';
import useStyles from './style';

const Wizard = ({
  type: wizardType,
  title,
  toDashboard,
  addWidget,
  addWidgetConfig,
  addWidgetSaga,
  isMenuOpen,
}) => {
  const classes = useStyles();
  const steps = [
    'steps.general',
    'steps.devices',
    'steps.attributes',
    'steps.filters',
    'steps.overview',
  ];
  const {
    line: wizardLineType,
    area: wizardAreaType,
    bar: wizardBarType,
    table: wizardTableType,
  } = __CONFIG__;

  const initialState = {
    general,
    devices: [],
    attributes: [],
    filter: {},
    activeStep: 0,
  };

  const [searchDeviceTerm, setSearchDeviceTerm] = useState('');
  const {
    paginatorData,
    setPaginatorData,
    setCurrentPage,
    setPageSize,
    setDisablePaginator,
  } = usePaginator();

  useEffect(() => {
    setDisablePaginator(true);
    DeviceService.getDevicesList(
      { number: paginatorData.currentPage, size: paginatorData.pageSize },
      { label: searchDeviceTerm },
    )
      .then(response => {
        const { devices, currentPage, totalPages } = response.getDevices;
        setPaginatorData({ data: devices, currentPage, totalPages });
      })
      .catch(error => {
        console.error(error); // TODO tratamento de erro da api
        setDisablePaginator(false);
      });
  }, [
    setDisablePaginator,
    setPaginatorData,
    paginatorData.currentPage,
    paginatorData.pageSize,
    searchDeviceTerm,
  ]);

  const handleSearchChange = useCallback(
    searchTerm => {
      setSearchDeviceTerm(searchTerm);
      setCurrentPage(1);
    },
    [setCurrentPage],
  );

  const generateScheme = useCallback(state => {
    const { lastN, operationType, dateFrom, dateTo, isRealTime } = state.filter;

    return DeviceService.parseHistoryQuery({
      devices: _.values(
        _.mapValues(
          _.groupBy(state.attributes.dynamicValues, 'deviceID'),
          (value, key) => {
            return {
              deviceID: key,
              dynamicAttrs: value.map(val => val.label),
            };
          },
        ),
      ),
      dateFrom,
      dateTo,
      operationType,
      lastN,
      isRealTime,
    });
  }, []);

  const { createLineWidget } = useLine(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );
  const { createAreaWidget } = useArea(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );
  const { createBarWidget } = useBar(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );
  const { createTableWidget } = useTable(
    addWidget,
    addWidgetConfig,
    addWidgetSaga,
    generateScheme,
  );

  const createNewWidget = useCallback(
    data => {
      switch (wizardType) {
        case wizardLineType:
          createLineWidget(data);
          break;
        case wizardAreaType:
          createAreaWidget(data);
          break;
        case wizardBarType:
          createBarWidget(data);
          break;
        case wizardTableType:
          createTableWidget(data);
          break;
        default:
          break;
      }
    },
    [
      wizardType,
      wizardAreaType,
      wizardBarType,
      wizardLineType,
      wizardTableType,
      createAreaWidget,
      createBarWidget,
      createLineWidget,
      createTableWidget,
    ],
  );

  const memoizedReducer = useCallback(
    (state, { type, payload = {} }) => {
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
          toDashboard();
          return {};
        default:
          return {};
      }
    },
    [createNewWidget, toDashboard],
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);
  const { activeStep } = state;

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const getStepContent = useCallback(
    stepIndex => {
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
              initialState={paginatorData.pageData}
              selectedValues={state.devices}
              handleClick={dispatch}
              steps={steps}
              activeStep={stepIndex}
              isOpen={isMenuOpen}
              onFilter={handleSearchChange}
              usePagination
              currentPage={paginatorData.currentPage}
              pageSize={paginatorData.pageSize}
              totalPages={paginatorData.totalPages}
              onPageSizeChange={pageSize => setPageSize(pageSize)}
              onPageChange={(event, page) => setCurrentPage(page)}
              isLoading={paginatorData.disabled}
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
            <GeneralFilter
              handleNavigate={dispatch}
              steps={steps}
              activeStep={stepIndex}
            />
          );
        case 4:
          return (
            <Summary
              initialState={{
                general: state.general,
                values: state.attributes,
              }}
              handleClick={dispatch}
              steps={steps}
              activeStep={stepIndex}
              isOpen={isMenuOpen}
            />
          );
        default:
          return 'Unknown stepIndex';
      }
    },
    [
      handleSearchChange,
      isMenuOpen,
      paginatorData.currentPage,
      paginatorData.disabled,
      paginatorData.pageData,
      paginatorData.pageSize,
      paginatorData.totalPages,
      setCurrentPage,
      setPageSize,
      state.attributes,
      state.devices,
      state.general,
      steps,
    ],
  );

  const { t } = useTranslation(['dashboard']);

  return (
    <ViewContainer headerTitle={title}>
      <div className={classes.root}>
        <Stepper
          classes={{ root: classes.paper }}
          alternativeLabel
          activeStep={activeStep}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{t([label, 'undefined'])}</StepLabel>
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
            getStepContent(activeStep)
          )}
        </div>
      </div>
    </ViewContainer>
  );
};

Wizard.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toDashboard: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...menuSelector(state),
});

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
